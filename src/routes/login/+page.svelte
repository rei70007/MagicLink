<!-- Login-Seite ( /login ) -->
<svelte:head><title>Anmelden – Magic Link</title></svelte:head>

<main class="card">
  <svg class="icon" viewBox="0 0 64 64" aria-hidden="true">
    <circle cx="22" cy="32" r="12" fill="none" stroke="#1d2b53" stroke-width="5" />
    <path d="M34 32h24M50 32v9M58 32v7" stroke="#1d2b53" stroke-width="5" stroke-linecap="round" />
    <circle cx="22" cy="32" r="4" fill="#f2b705" />
  </svg>

  <h1>Anmelden ohne Passwort</h1>
  <p>Gib deine E-Mail-Adresse ein. Wir schicken dir einen Link, mit dem du dich einloggen kannst.</p>

  <!-- Schickt die E-Mail an die Form-Action in +page.server.js (Person A) -->
  <form method="POST">
    <label for="email">E-Mail-Adresse</label>
    <input type="email" id="email" name="email" placeholder="name@beispiel.at" required autocomplete="email" />
    <button type="submit">Login-Link senden</button>
  </form>

  <div class="hint">Der Link ist 15 Minuten gültig und funktioniert nur einmal.</div>
</main>
