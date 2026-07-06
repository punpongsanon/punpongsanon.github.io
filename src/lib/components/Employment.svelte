<script>
	import employment from '$lib/data/employment.yaml';
	import { asset } from '$lib/asset.js';

	const jobs = employment.employment_list ?? [];
	const education = employment.education_list ?? [];
</script>

<hr />
<section id="employment">
	<h4><i class="fa-regular fa-building"></i> Employment and Education History</h4>

	<div class="history-grid">
		<div>
			<h5 class="group-title">Employment History</h5>
			<div class="history-list">
				{#each jobs as job}
					<div class="history-item">
						{#if job.logo}
							<div class="history-logo"><img src={asset(job.logo)} alt={job.place} /></div>
						{/if}
						<div class="history-body">
							<span class="role">{@html job.position}</span><br />
							<i><a href={job.url} target="_blank" rel="noopener">{@html job.place}</a></i><br />
							{job.from} <i class="fa-solid fa-angle-right"></i> {job.to}<br />
							{@html job.desc}
						</div>
					</div>
				{/each}
			</div>
		</div>

		<div>
			<h5 class="group-title">Education History</h5>
			<div class="history-list">
				{#each education as ed}
					<div class="history-item">
						{#if ed.logo}
							<div class="history-logo"><img src={asset(ed.logo)} alt={ed.place} /></div>
						{/if}
						<div class="history-body">
							<span class="role">{@html ed.position}</span><br />
							<i><a href={ed.url} target="_blank" rel="noopener">{@html ed.place}</a></i><br />
							{ed.from} <i class="fa-solid fa-angle-right"></i> {ed.to}<br />
							{#if ed.advisors}Advisor: {@html ed.advisors}<br />{/if}
							{#if ed.thesis}Thesis: <a href={asset(ed.pdf)} target="_blank" rel="noopener"
									>{@html ed.thesis}</a
								>{/if}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
