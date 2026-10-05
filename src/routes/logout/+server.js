// Logout: delete the session and remove the cookie
import { redirect } from '@sveltejs/kit';
import { query } from '$lib/db.js';
import { findeSession } from '$lib/session.js';

export async function POST({ cookies }) {
	const session = await findeSession(cookies);

	// Delete the active session from the database
	if (session) {
		await query('DELETE FROM Session WHERE session_id = ?', [session.session_id]);
	}

	// Remove the session cookie from the browser
	cookies.delete('session', { path: '/' });

	// Redirect to the homepage after logging out
	redirect(303, '/');
}