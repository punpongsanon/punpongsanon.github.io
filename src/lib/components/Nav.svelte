<script>
	import { lang, setLang } from '$lib/lang.svelte.js';

	let { title } = $props();
</script>

<nav class="topnav">
	<div class="topnav-inner">
		<a class="nav-name" href="#about">{title}</a>
		<ul>
			<li><a href="#research">Research</a></li>
			<li><a href="#publication">Publications</a></li>
			<li><a href="#activities">Activities</a></li>
			<li><a href="#employment">History</a></li>
			<li>
				<div class="lang-switch" role="group" aria-label="Introduction language">
					<button
						class="lang-opt"
						class:active={lang.current === 'en'}
						aria-pressed={lang.current === 'en'}
						onclick={() => setLang('en')}>EN</button
					>
					<button
						class="lang-opt"
						class:active={lang.current === 'ja'}
						aria-pressed={lang.current === 'ja'}
						onclick={() => setLang('ja')}>JP</button
					>
				</div>
			</li>
		</ul>
	</div>
</nav>
