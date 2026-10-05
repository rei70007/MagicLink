<!-- Bestätigungsseite ( /check-mail ) -->
<svelte:head><title>Check deine E-Mails – Magic Link</title></svelte:head>

<main class="card">
  <svg class="icon" viewBox="0 0 64 64" aria-hidden="true">
    <rect x="6" y="14" width="52" height="36" rx="4" fill="none" stroke="#1d2b53" stroke-width="4" />
    <path d="M8 17l24 18 24-18" fill="none" stroke="#1d2b53" stroke-width="4" stroke-linejoin="round" />
    <rect x="44" y="18" width="10" height="12" fill="#f2b705" />
  </svg>

  <h1>Check deine E-Mails</h1>
  <p>Wir haben dir einen Login-Link geschickt. Klick auf den Link in der E-Mail, um dich einzuloggen.</p>

  <div class="hint">Der Link ist 15 Minuten gültig. Keine E-Mail bekommen? Schau im Spam-Ordner nach.</div>

  <p style="margin-top:20px;margin-bottom:0">
    <a class="button secondary" href="/login">Neuen Link anfordern</a>
  </p>
</main>
