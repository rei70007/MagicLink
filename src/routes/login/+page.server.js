// Login: receive email and generate a Magic Link
import { redirect, fail } from '@sveltejs/kit';
import crypto from 'node:crypto';
import { query, hashToken } from '$lib/db.js';
import { sendeMagicLink } from '$lib/mail.js';
import { findeSession } from '$lib/session.js';

// Redirect already logged-in users to the homepage
export async function load({ cookies }) {
	if (await findeSession(cookies)) redirect(303, '/');
}

export const actions = {
	default: async ({ request, url }) => {
		// Read and validate the email address from the form
		const formData = await request.formData();
		const email = String(formData.get('email') ?? '').trim().toLowerCase();

		if (!email.includes('@')) {
			return fail(400, { fehler: 'Bitte eine gültige E-Mail eingeben.' });
		}

		// Find the user or create a new user if the email does not exist
		const users = await query('SELECT user_id FROM `User` WHERE email = ?', [email]);
		let userId;
		if (users.length > 0) {
			userId = users[0].user_id;
		} else {
			const result = await query('INSERT INTO `User` (email) VALUES (?)', [email]);
			userId = result.insertId;
		}

		// Generate a secure random token for the Magic Link
		const token = crypto.randomBytes(32).toString('hex');

		// Store only the token hash and set the link to expire after 15 minutes
		await query(
			`INSERT INTO MagicLink_token (user_id, token_hash, expires_at)
			 VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 15 MINUTE))`,
			[userId, hashToken(token)]
		);

		// Send the Magic Link to the user's email
		const link = `${url.origin}/verify?token=${token}`;
		try {
			await sendeMagicLink(email, link);
			console.log(`E-Mail mit Magic Link gesendet an: ${email}`);
		} catch (fehler) {
			console.error('E-Mail-Versand fehlgeschlagen:', fehler.message);
		}

		// Also print the link in the terminal for testing purposes
		console.log('\n================ MAGIC LINK ================');
		console.log(link);
		console.log('============================================\n');

		// Redirect the user to the email confirmation page
		redirect(303, '/check-mail');
	}
};