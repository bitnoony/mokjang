<script>
	import MeetingList from './MeetingList.svelte';
	import MokwonList from './MokwonList.svelte';

	export let data;
	const { mokjang, mokjaId } = data;
</script>

<style>
	section.mokjang-container {
		margin: 1rem auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: calc(100vh - 2rem - 60px);
	}

	section.mokjang-container > article {
		padding: 0 1rem;
		height: 100%;
	}

	section.mokjang-container > article.meeting-article {
		width: 60%;
	}
	section.mokjang-container > article.mokwon-article {
		width: 40%;
	}
</style>

<section class="container mokjang-container">
	<article class="meeting-article">
		<MeetingList mokjang={mokjang} mokjaId={mokjaId} />
	</article>
	<article class="mokwon-article">
		<MokwonList mokjang={mokjang} mokjaId={mokjaId} />
	</article>
</section>
