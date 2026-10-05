// Verify: Magic Link prüfen, Session anlegen, Cookie setzen
import { redirect } from '@sveltejs/kit';
import { dev } from '$app/environment';
import crypto from 'node:crypto';
import { query, hashToken } from '$lib/db.js';

export async function GET({ url, cookies }) {
	// 1. Token aus der URL lesen (/verify?token=...)
	const token = url.searchParams.get('token');
	if (!token) redirect(303, '/link-fehler?grund=ungueltig');

	// 2. Token hashen und in der Datenbank suchen
	const treffer = await query(
		`SELECT token_id, user_id, used_at, expires_at <= NOW() AS abgelaufen
		 FROM MagicLink_token WHERE token_hash = ?`,
		[hashToken(token)]
	);
	const eintrag = treffer[0];

	// 3. Fehlerfälle prüfen
	if (!eintrag) redirect(303, '/link-fehler?grund=ungueltig');
	if (eintrag.used_at) redirect(303, '/link-fehler?grund=benutzt');
	if (eintrag.abgelaufen) redirect(303, '/link-fehler?grund=abgelaufen');

	// 4. Token als benutzt markieren -> funktioniert nur einmal
	await query('UPDATE MagicLink_token SET used_at = NOW() WHERE token_id = ?', [eintrag.token_id]);

	// 5. Neue Session erzeugen (in der DB nur der Hash, 7 Tage gültig)
	const sessionToken = crypto.randomBytes(32).toString('hex');
	await query(
		`INSERT INTO Session (user_id, session_hash, expires_at)
		 VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 7 DAY))`,
		[eintrag.user_id, hashToken(sessionToken)]
	);

	// 6. Cookie setzen – der Browser schickt es ab jetzt automatisch mit
	cookies.set('session', sessionToken, {
		path: '/',
		httpOnly: true, // JavaScript im Browser kann das Cookie nicht lesen
		sameSite: 'lax', // Schutz gegen Anfragen von fremden Seiten (CSRF)
		secure: !dev, // im Test (localhost) aus, online nur über HTTPS
		maxAge: 60 * 60 * 24 * 7 // 7 Tage in Sekunden
	});

	// 7. Zurück zur Startseite – jetzt eingeloggt
	redirect(303, '/');
}
