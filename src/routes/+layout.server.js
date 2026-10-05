// Runs on every page and checks if a user is logged in

// The result (user) is available to the Navbar and all pages
import { findeSession } from '$lib/session.js';

export async function load({ cookies }) {

    const session = await findeSession(cookies);

    // Return the user's email if logged in, otherwise return null
    return { user: session ? { email: session.email } : null };

}