<!-- Fehlerseite ( /link-fehler?grund=abgelaufen | benutzt | ungueltig ) -->
<script>
  import { page } from '$app/state';

  const texte = {
    abgelaufen: ['Link abgelaufen', 'Der Link war nur 15 Minuten gültig. Fordere einen neuen Login-Link an.'],
    benutzt: ['Link schon benutzt', 'Jeder Link funktioniert nur einmal. Fordere einen neuen Login-Link an.'],
    ungueltig: ['Link ungültig', 'Diesen Link gibt es nicht. Prüfe, ob du ihn vollständig kopiert hast.']
  };

  let grund = $derived(page.url.searchParams.get('grund') ?? 'ungueltig');
  let eintrag = $derived(texte[grund] ?? texte.ungueltig);
</script>

<svelte:head><title>{eintrag[0]} – Magic Link</title></svelte:head>

<main class="card error">
  <svg class="icon" viewBox="0 0 64 64" aria-hidden="true">
    <circle cx="32" cy="32" r="26" fill="none" stroke="#b3261e" stroke-width="5" />
    <path d="M32 18v18M32 44v1" stroke="#b3261e" stroke-width="6" stroke-linecap="round" />
  </svg>

  <h1>{eintrag[0]}</h1>
  <p>{eintrag[1]}</p>

  <a class="button" href="/login">Neuen Link anfordern</a>
</main>
