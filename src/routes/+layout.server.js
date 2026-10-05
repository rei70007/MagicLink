// Läuft bei JEDER Seite: prüft, ob jemand eingeloggt ist.
// Das Ergebnis (user) bekommen die Navbar und alle Seiten.
import { findeSession } from '$lib/session.js';

export async function load({ cookies }) {
	const session = await findeSession(cookies);
	return { user: session ? { email: session.email } : null };
}
