<script>
	let { item } = $props();
</script>

<div class="pub-item">
	{#if item.team}{@html item.team}. {/if}<b>{@html item.title}</b>{#if item.event},
		<i><a href={item['event-web']} target="_blank" rel="noopener">{@html item.event}</a></i>{/if}.
	{#if item.pages}{@html item.pages}, {/if}
	{#if item.date}{@html item.date}.{/if}

	{#if item.remark}
		<span class="badge"><i class="fas fa-quote-left"></i><strong>{@html item.remark}</strong></span>
	{/if}
	{#if item.accept_rate}
		<span class="badge"><i class="fa-solid fa-percent"></i><strong>{@html item.accept_rate}</strong
			></span>
	{/if}
	{#if item.prize}
		<span class="badge award"><i class="fa-solid fa-award"></i><strong>{@html item.prize}</strong
			></span>
	{/if}

	<span class="pub-links">
		{#if item.doi}<a href={item.doi} target="_blank" rel="noopener" title="DOI"
				><i class="fa-regular fa-paper-plane"></i></a
			>{/if}
		{#if item.pdf}<a href={item.pdf} target="_blank" rel="noopener" title="PDF"
				><i class="fa-regular fa-file-pdf"></i></a
			>{/if}
		{#if item.code}<a href={item.code} target="_blank" rel="noopener" title="Code"
				><i class="fa-regular fa-file-code"></i></a
			>{/if}
		{#if item.demo}<a href={item.demo} target="_blank" rel="noopener" title="Video"
				><i class="fa-brands fa-youtube"></i></a
			>{/if}
	</span>
</div>
