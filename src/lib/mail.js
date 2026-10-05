// E-Mail-Versand über SMTP2GO (Zugangsdaten aus der .env)
import nodemailer from 'nodemailer';
import { env } from '$env/dynamic/private';

const transporter = nodemailer.createTransport({
	host: 'mail.smtp2go.com',
	port: 2525,
	secure: false, // Verbindung startet unverschlüsselt ...
	requireTLS: true, // ... und wird dann sofort mit TLS verschlüsselt
	connectionTimeout: 10000, // nach 10 Sekunden aufgeben
	auth: {
		user: env.SMTP_USER, // SMTP-User aus SMTP2GO (Sending > SMTP Users)
		pass: env.SMTP_PASSWORD // Passwort dieses SMTP-Users
	}
});

// Schickt den Magic Link an die eingegebene E-Mail-Adresse
export async function sendeMagicLink(email, link) {
	await transporter.sendMail({
		from: `"Magic Link Demo" <${env.MAIL_FROM}>`, // muss ein Verified Sender sein
		to: email,
		subject: 'Dein Login-Link',
		text: `Klicke auf diesen Link, um dich einzuloggen:\n${link}\n\nDer Link ist 15 Minuten gültig und funktioniert nur einmal.`,
		html: `
			<div style="font-family: sans-serif; max-width: 480px;">
				<h2 style="color: #1d2b53;">Dein Login-Link</h2>
				<p>Klicke auf den Button, um dich einzuloggen:</p>
				<p>
					<a href="${link}" style="display: inline-block; padding: 12px 20px; background: #1d2b53;
					   color: #fff; text-decoration: none; border-radius: 8px; font-weight: bold;">
						Jetzt einloggen
					</a>
				</p>
				<p style="color: #5b6785; font-size: 14px;">
					Der Link ist 15 Minuten gültig und funktioniert nur einmal.<br>
					Wenn du das nicht warst, ignoriere diese E-Mail.
				</p>
			</div>`
	});
}
