<script>
	import '../app.css';
	import site from '$lib/data/site.yaml';
	import about from '$lib/data/about.yaml';
	import Nav from '$lib/components/Nav.svelte';
	import BackToTop from '$lib/components/BackToTop.svelte';

	let { children } = $props();

	// Absolute URLs for canonical / social / structured data.
	const baseUrl = site.url ?? '/';
	const pageTitle =
		site['page-title'] ?? (site.tagline ? `${site.title} — ${site.tagline}` : site.title);
	const absImage = new URL(site.image, baseUrl).href;

	// schema.org Person structured data.
	const sameAs = [about.scholar, about.orcid, about.github, about.researchgate, about.youtube].filter(
		Boolean
	);
	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: about.name ?? site.title,
		url: baseUrl,
		image: absImage,
		jobTitle: site['job-title'],
		affiliation: site.affiliation ? { '@type': 'Organization', name: site.affiliation } : undefined,
		sameAs
	};
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={site.description} />
	<meta name="keywords" content={site.keywords} />
	<meta name="author" content={site.title} />
	<link rel="canonical" href={baseUrl} />

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={site.title} />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={site.description} />
	<meta property="og:url" content={baseUrl} />
	<meta property="og:image" content={absImage} />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={site.description} />
	<meta name="twitter:image" content={absImage} />

	<!-- Structured data -->
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}<` + '/script>'}
</svelte:head>

<Nav title={site.title} />

<div class="container">
	{@render children()}
</div>

<BackToTop />
