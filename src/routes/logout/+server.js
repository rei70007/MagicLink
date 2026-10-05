// Logout: Session löschen, Cookie löschen
import { redirect } from '@sveltejs/kit';
import { query } from '$lib/db.js';
import { findeSession } from '$lib/session.js';

export async function POST({ cookies }) {
	const session = await findeSession(cookies);

	// Session in der Datenbank löschen
	if (session) {
		await query('DELETE FROM Session WHERE session_id = ?', [session.session_id]);
	}

	// Cookie im Browser löschen
	cookies.delete('session', { path: '/' });

	// Zurück zur Startseite – jetzt ausgeloggt
	redirect(303, '/');
}
	