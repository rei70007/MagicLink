// Login: E-Mail empfangen, Magic Link erzeugen
import { redirect, fail } from '@sveltejs/kit';
import crypto from 'node:crypto';
import { query, hashToken } from '$lib/db.js';
import { sendeMagicLink } from '$lib/mail.js';
import { findeSession } from '$lib/session.js';

// Wer schon eingeloggt ist, braucht die Login-Seite nicht
export async function load({ cookies }) {
	if (await findeSession(cookies)) redirect(303, '/');
}

export const actions = {
	default: async ({ request, url }) => {
		// 1. E-Mail aus dem Formular lesen
		const formData = await request.formData();
		const email = String(formData.get('email') ?? '').trim().toLowerCase();

		if (!email.includes('@')) {
			return fail(400, { fehler: 'Bitte eine gültige E-Mail eingeben.' });
		}

		// 2. User suchen – wenn es ihn noch nicht gibt, neu anlegen
		const users = await query('SELECT user_id FROM `User` WHERE email = ?', [email]);
		let userId;
		if (users.length > 0) {
			userId = users[0].user_id;
		} else {
			const result = await query('INSERT INTO `User` (email) VALUES (?)', [email]);
			userId = result.insertId;
		}

		// 3. Zufälligen, sicheren Token erzeugen (32 Bytes = 64 Zeichen)
		const token = crypto.randomBytes(32).toString('hex');

		// 4. Nur den Hash speichern, gültig für 15 Minuten
		await query(
			`INSERT INTO MagicLink_token (user_id, token_hash, expires_at)
			 VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 15 MINUTE))`,
			[userId, hashToken(token)]
		);

		// 5. Magic Link per E-Mail schicken
		const link = `${url.origin}/verify?token=${token}`;
		try {
			await sendeMagicLink(email, link);
			console.log(`E-Mail mit Magic Link gesendet an: ${email}`);
		} catch (fehler) {
			console.error('E-Mail-Versand fehlgeschlagen:', fehler.message);
		}

		// Link zusätzlich im Terminal ausgeben (falls die E-Mail nicht ankommt)
		console.log('\n================ MAGIC LINK ================');
		console.log(link);
		console.log('============================================\n');

		// 6. Weiter zur Seite "Check deine E-Mails"
		redirect(303, '/check-mail');
	}
};
