<script>
	import about from '$lib/data/about.yaml';
	import { asset } from '$lib/asset.js';
	import { lang } from '$lib/lang.svelte.js';

	const interests = about['research-interests'] ?? [];

	// Swap only the self-introduction paragraphs; fall back to English if a
	// Japanese variant is missing.
	const firstPara = $derived(
		(lang.current === 'ja' && about['first-paragraph-ja']) || about['first-paragraph']
	);
	const secondPara = $derived(
		(lang.current === 'ja' && about['second-paragraph-ja']) || about['second-paragraph']
	);
	const introText = $derived(
		(lang.current === 'ja' && about['research-introduction-ja']) || about['research-introduction']
	);
	const pronunciation = $derived(
		(lang.current === 'ja' && about['pronunciation-ja']) || about.pronunciation
	);
</script>

<header class="profile" id="about">
	<div class="profile-photo">
		<img src={asset(about['profile-pic'])} alt={about.name} />
	</div>

	<div class="profile-intro">
		<h1>{about.name}</h1>
		{#if pronunciation}
			<p class="pronunciation">{pronunciation}</p>
		{/if}

		<p>{@html firstPara}</p>
		<p>{@html secondPara}</p>

		<div class="social-icons">
			{#if about.scholar}
				<a class="social-icon" href={about.scholar} target="_blank" rel="noopener" title="Google Scholar">
					<i class="fa fa-graduation-cap"></i>
				</a>
			{/if}
			{#if about.github}
				<a class="social-icon" href={about.github} target="_blank" rel="noopener" title="GitHub">
					<i class="fab fa-github"></i>
				</a>
			{/if}
			{#if about.youtube}
				<a class="social-icon" href={about.youtube} target="_blank" rel="noopener" title="YouTube">
					<i class="fab fa-youtube"></i>
				</a>
			{/if}
			{#if about.orcid}
				<a class="social-icon" href={about.orcid} target="_blank" rel="noopener" title="ORCID">
					<i class="fab fa-orcid"></i>
				</a>
			{/if}
		</div>
	</div>
</header>

<div class="codebox">
	{@html introText}
	{#if interests.length}
		<div class="interests">
			{#each interests as interest}
				<span class="interest-line"><b>{interest.field}:</b> {interest.subfields}</span>
			{/each}
		</div>
	{/if}
</div>
