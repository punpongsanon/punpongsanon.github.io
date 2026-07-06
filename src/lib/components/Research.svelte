<script>
	import research from '$lib/data/research.yaml';
	import { asset } from '$lib/asset.js';

	const categories = research.categories ?? [];
	const projects = (research.projects ?? []).map((p, i) => ({ ...p, _id: i }));
	const perPage = 5;

	let filter = $state('*');
	let page = $state(1);
	let expanded = $state({});

	const filtered = $derived(
		filter === '*' ? projects : projects.filter((p) => p.category === filter)
	);
	const totalPages = $derived(Math.max(1, Math.ceil(filtered.length / perPage)));
	const paged = $derived(filtered.slice((page - 1) * perPage, page * perPage));

	function setFilter(f) {
		filter = f;
		page = 1;
	}

	function gotoResearch() {
		document.getElementById('research')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
	function prev() {
		if (page > 1) {
			page -= 1;
			gotoResearch();
		}
	}
	function next() {
		if (page < totalPages) {
			page += 1;
			gotoResearch();
		}
	}
</script>

<hr />
<section id="research">
	<h2><i class="fa-solid fa-book"></i> Research Projects</h2>

	<div class="pill-row">
		<button class="pill" class:active={filter === '*'} onclick={() => setFilter('*')}>all</button>
		<i class="fa-solid fa-angles-right"></i>
		{#each categories as cat}
			<button
				class="pill"
				class:active={filter === cat['data-filter']}
				onclick={() => setFilter(cat['data-filter'])}
			>
				{cat['category-name']}
			</button>
		{/each}
	</div>

	<div class="projects">
		{#each paged as project (project._id)}
			<article class="project">
				{#if project.gif}
					<div class="project-media">
						<img src={asset(project.gif)} alt={project.title} />
					</div>
				{/if}
				<div class="project-body">
					{#if project['system-name']}<b><i>{@html project['system-name']}</i>:</b> {/if}<b
						>{@html project.title}</b
					>
					<br />
					<i
						><a href={project['conference-web']} target="_blank" rel="noopener"
							>{@html project.conference}</a
						></i
					>
					{#if project.status}<b style="color:#e74d3c">[{project.status}]</b>{/if}
					<br />
					{@html project.authors}

					<div class="project-links">
						{#if project.doi}<a href={project.doi} target="_blank" rel="noopener" title="DOI"
								><i class="fa-brands fa-researchgate"></i></a
							>{/if}
						{#if project.pdf}<a href={project.pdf} target="_blank" rel="noopener" title="PDF"
								><i class="fa-regular fa-file-pdf"></i></a
							>{/if}
						{#if project.code}<a href={project.code} target="_blank" rel="noopener" title="Code"
								><i class="fa-regular fa-file-code"></i></a
							>{/if}
						{#if project.demo}<a href={project.demo} target="_blank" rel="noopener" title="Video"
								><i class="fa-brands fa-youtube"></i></a
							>{/if}
						{#if project.slides}<a href={project.slides} target="_blank" rel="noopener" title="Slides"
								><i class="fa-regular fa-file-powerpoint"></i></a
							>{/if}
						{#if project.talk}<a href={project.talk} target="_blank" rel="noopener" title="Talk"
								><i class="fa-regular fa-message"></i></a
							>{/if}
						{#if project.poster}<a href={project.poster} target="_blank" rel="noopener" title="Poster"
								><i class="fa-regular fa-note-sticky"></i></a
							>{/if}
						{#if project['project-web']}<a
								href={project['project-web']}
								target="_blank"
								rel="noopener"
								title="Project page"><i class="fa-solid fa-bookmark"></i></a
							>{/if}
					</div>

					{#if project['abstract-less']}
						<u><b><i>Abstract</i></b>:</u>
						{@html project['abstract-less']}{#if expanded[project._id]}{@html project['abstract-more']}{/if}
						{#if project['abstract-more']}
							<button class="see-more" onclick={() => (expanded[project._id] = !expanded[project._id])}>
								{expanded[project._id] ? '... See Less' : '... See More'}
							</button>
						{/if}
					{/if}
				</div>
			</article>
		{/each}
	</div>

	{#if totalPages > 1}
		<div class="pager-row">
			<button class="pager" onclick={prev} disabled={page === 1}>&#8592; previous</button>
			<span>page {page} of {totalPages}</span>
			<button class="pager" onclick={next} disabled={page === totalPages}>next &#8594;</button>
		</div>
	{/if}
</section>
