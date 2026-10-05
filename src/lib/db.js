// Datenbank-Verbindung (MySQL) – wird von allen Server-Dateien benutzt
// Die Tabellen wurden in DataGrip erstellt.
import mysql from 'mysql2/promise';
import crypto from 'node:crypto';
import { env } from '$env/dynamic/private';

// Verbindungsdaten kommen aus der .env
const pool = mysql.createPool({
	host: env.DB_HOST,
	port: Number(env.DB_PORT),
	user: env.DB_USER,
	password: env.DB_PASSWORD,
	database: env.DB_NAME
});

// SQL ausführen. Die ? werden sicher durch die Werte ersetzt (Schutz vor SQL-Injection).
export async function query(sql, werte = []) {
	const [ergebnis] = await pool.execute(sql, werte);
	return ergebnis;
}

// Hilfsfunktion: macht aus einem Token einen SHA-256-Hash.
// In der Datenbank speichern wir NIE den echten Token, nur den Hash.
export function hashToken(token) {
	return crypto.createHash('sha256').update(token).digest('hex');
}
