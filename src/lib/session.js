// Prüft das Cookie "session" und findet den eingeloggten User
import { query, hashToken } from '$lib/db.js';

export async function findeSession(cookies) {
	const sessionToken = cookies.get('session');
	if (!sessionToken) return null;

	// Nur gültige Sessions (nicht abgelaufen) zählen
	const treffer = await query(
		`SELECT Session.session_id, \`User\`.email
		 FROM Session JOIN \`User\` ON \`User\`.user_id = Session.user_id
		 WHERE Session.session_hash = ? AND Session.expires_at > NOW()`,
		[hashToken(sessionToken)]
	);
	return treffer[0] ?? null;
}
