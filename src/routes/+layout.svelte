<script>
	import '../app.css';
	import site from '$lib/data/site.yaml';
	import Nav from '$lib/components/Nav.svelte';
	import BackToTop from '$lib/components/BackToTop.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>{site.title} | {site.info}</title>
	<meta name="description" content={`${site.title} — personal homepage`} />
	<meta name="author" content={site.title} />
</svelte:head>

<Nav title={site.title} />

<div class="container">
	{@render children()}
</div>

<BackToTop />
