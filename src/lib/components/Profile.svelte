<script>
	import about from '$lib/data/about.yaml';
	import { asset } from '$lib/asset.js';

	const interests = about['research-interests'] ?? [];
</script>

<header class="profile" id="about">
	<div class="profile-photo">
		<img src={asset(about['profile-pic'])} alt={about.name} />
	</div>

	<div class="profile-intro">
		<h1>{about.name}</h1>
		{#if about.pronunciation}
			<p class="pronunciation">{about.pronunciation}</p>
		{/if}

		<p>{@html about['first-paragraph']}</p>
		<p>{@html about['second-paragraph']}</p>

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
	{@html about['research-introduction']}
	{#if interests.length}
		<div class="interests">
			{#each interests as interest}
				<span class="interest-line"><b>{interest.field}:</b> {interest.subfields}</span>
			{/each}
		</div>
	{/if}
</div>
