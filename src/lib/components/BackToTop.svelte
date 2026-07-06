<script>
	import { onMount } from 'svelte';

	let show = $state(false);

	onMount(() => {
		const onScroll = () => (show = window.scrollY > 300);
		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();
		return () => window.removeEventListener('scroll', onScroll);
	});

	function toTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<button
	id="back-to-top-button"
	class:show
	aria-label="Back to top"
	onclick={toTop}
></button>
