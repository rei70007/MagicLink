<!-- Start page ( / ) – shows whether the user is logged in -->
<script>
	// "data.user" comes from +layout.server.js (null = not logged in)
	let { data } = $props();
</script>

<svelte:head><title>Home – Magic Link</title></svelte:head>

{#if data.user}
	<!-- Content shown when the user is logged in -->
	<main class="card erfolg">
		<svg class="icon" viewBox="0 0 64 64" aria-hidden="true">
			<circle cx="32" cy="32" r="26" fill="none" stroke="#1f7a4d" stroke-width="5" />
			<path d="M20 33l8 8 16-17" fill="none" stroke="#1f7a4d" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
		</svg>

		<h1>Du bist eingeloggt</h1>
		<p>Angemeldet als <span class="email">{data.user.email}</span></p>

		<div class="hint" style="margin-top:0">
			Der Server erkennt dich über das Cookie <strong>session</strong> (HttpOnly). Du bleibst 7 Tage
			eingeloggt, oder bis du dich abmeldest.
		</div>
	</main>
{:else}
	<!-- Content shown when the user is not logged in -->
	<main class="card">
		<svg class="icon" viewBox="0 0 64 64" aria-hidden="true">
			<rect x="14" y="28" width="36" height="28" rx="4" fill="none" stroke="#1d2b53" stroke-width="5" />
			<path d="M22 28v-8a10 10 0 0 1 20 0v8" fill="none" stroke="#1d2b53" stroke-width="5" />
			<circle cx="32" cy="42" r="4" fill="#f2b705" />
		</svg>

		<h1>Willkommen</h1>
		<p>Du bist <strong>nicht eingeloggt</strong>. Melde dich ohne Passwort an: Du bekommst einen Magic Link per E-Mail.</p>

		<a class="button" href="/login">Einloggen</a>
	</main>
{/if}