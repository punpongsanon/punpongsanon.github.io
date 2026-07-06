<script>
	import publication from '$lib/data/publication.yaml';
	import PubItem from './PubItem.svelte';

	const books = publication.book_list ?? [];
	const journals = publication.journal_list ?? [];
	const papers = publication.paper_list ?? [];
	const posters = publication.poster_list ?? [];

	// Show everything by default; narrow to one category on user selection.
	let selected = $state('all');
	const show = (key) => selected === 'all' || selected === key;
</script>

<hr />
<section id="publication">
	<h2><i class="fa-brands fa-firstdraft"></i> Publications</h2>

	<div class="pill-row">
		<button class="pill" class:active={selected === 'all'} onclick={() => (selected = 'all')}>
			All
		</button>
		<i class="fa-solid fa-angles-right"></i>
		{#if books.length}
			<button class="pill" class:active={selected === 'books'} onclick={() => (selected = 'books')}>
				Books
			</button>
		{/if}
		<button
			class="pill"
			class:active={selected === 'journals'}
			onclick={() => (selected = 'journals')}
		>
			Journals/Articles
		</button>
		<button class="pill" class:active={selected === 'papers'} onclick={() => (selected = 'papers')}>
			Full Papers, Short Papers
		</button>
		<button
			class="pill"
			class:active={selected === 'posters'}
			onclick={() => (selected = 'posters')}
		>
			Talks, Posters and Demonstration
		</button>
	</div>

	{#if show('books') && books.length}
		<div class="pub-group">
			<h5 class="group-title">Books</h5>
			<div class="pub-list">
				{#each books as item}<PubItem {item} />{/each}
			</div>
		</div>
	{/if}

	{#if show('journals') && journals.length}
		<div class="pub-group">
			<h5 class="group-title">Journals and Articles</h5>
			<div class="pub-list">
				{#each journals as item}<PubItem {item} />{/each}
			</div>
		</div>
	{/if}

	{#if show('papers') && papers.length}
		<div class="pub-group">
			<h5 class="group-title">Conference Proceedings (Full Papers, Short Papers)</h5>
			<div class="pub-list">
				{#each papers as item}<PubItem {item} />{/each}
			</div>
		</div>
	{/if}

	{#if show('posters') && posters.length}
		<div class="pub-group">
			<h5 class="group-title">Conference Proceedings (Talks, Posters and Demonstration)</h5>
			<div class="pub-list">
				{#each posters as item}<PubItem {item} />{/each}
			</div>
		</div>
	{/if}
</section>
