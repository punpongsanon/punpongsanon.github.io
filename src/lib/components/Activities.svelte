<script>
	import activities from '$lib/data/activities.yaml';

	const talks = activities.talk_list ?? [];
	const funding = activities.funding_list ?? [];
	const awards = activities.award_list ?? [];
	const chairs = activities.chair_list ?? [];
	const ipc = activities.ipc_list ?? [];
	const reviewers = activities.reviewer_list ?? [];
</script>

<hr />
<section id="activities">
	<h2><i class="hgi hgi-stroke hgi-presentation-online"></i> Professional Activities</h2>

	<div class="activity-grid">
		<div class="activity-block full">
			<h5 class="group-title">Invited Talks</h5>
			<div class="activity-list">
				{#each talks as t}
					<div>
						<span class="date">{t.date}</span>
						<a href={t.url} target="_blank" rel="noopener">{@html t.where}</a>
						{@html t.place}
						<i class="fa-solid fa-angle-right"></i>
						"{@html t.topic}"
					</div>
				{/each}
			</div>
		</div>

		<div class="activity-block">
			<h5 class="group-title">Funding</h5>
			<div class="activity-list">
				{#each funding as f}
					<div>
						<span class="date">[{f.from} - {f.to}]</span><br />
						<a href={f.url} target="_blank" rel="noopener">{@html f.funding}</a><br />
						{@html f.topic}
					</div>
				{/each}
			</div>
		</div>

		<div class="activity-block">
			<h5 class="group-title">Awards</h5>
			<div class="activity-list">
				{#each awards as a}
					<div>
						<a href={a.url} target="_blank" rel="noopener">{@html a.awarding}</a><br />
						{@html a.title}
					</div>
				{/each}
			</div>
		</div>

		<div class="activity-block full">
			<h5 class="group-title">Academic Services</h5>
			<div class="activity-list">
				{#each chairs as c}
					<div>
						<span class="date">{c.year}</span>
						<a href={c.url} target="_blank" rel="noopener"
							>{@html c.position} <i class="fa-regular fa-share-from-square"></i></a
						>
						{@html c.conference}
					</div>
				{/each}
			</div>
		</div>

		<div class="activity-block">
			<h6 class="group-title sub">Program Committee member</h6>
			<div class="activity-list">
				{#each ipc as i}
					<div><a href={i.url} target="_blank" rel="noopener">{@html i.conference}</a> {i.year}</div>
				{/each}
			</div>
		</div>

		<div class="activity-block">
			<h6 class="group-title sub">Peer Review activities</h6>
			<div class="activity-list">
				{#each reviewers as r}
					<div>
						<span class="font-italic"><i>{@html r.conference}</i></span>
						<i class="fa-solid fa-angle-right"></i>
						{r.year}
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
