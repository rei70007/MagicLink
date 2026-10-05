<script>
	import './layout.css';
	let { data, children } = $props();
</script>

<!-- Navbar: visible on every page -->
<nav class="navbar">
	<a class="logo" href="/">
		<svg viewBox="0 0 64 64" aria-hidden="true">
			<circle cx="22" cy="32" r="12" fill="none" stroke="currentColor" stroke-width="6" />
			<path d="M34 32h24M50 32v9M58 32v7" stroke="currentColor" stroke-width="6" stroke-linecap="round" />
		</svg>
		Magic Link
	</a>

	<div class="nav-rechts">
		<a href="/">Home</a>

		<!-- Show the user's email and logout button when logged in -->
		{#if data.user}
			<span class="nav-email">{data.user.email}</span>
			<form method="POST" action="/logout">
				<button class="nav-button" type="submit">Abmelden</button>
			</form>
		{:else}
			<!-- Show the login button when no user is logged in -->
			<a class="nav-button" href="/login">Einloggen</a>
		{/if}
	</div>
</nav>

<div class="inhalt">
	{@render children()}
</div>