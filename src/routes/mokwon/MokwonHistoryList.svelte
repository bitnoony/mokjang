<script>
	import { supabase, getUser } from "$lib/supabaseClient";
	import MokwonMemo from "./MokwonMemo.svelte";

	let historyMemoList = [];
	$: historyMemoList;

	export async function getMokwonHistory(mokwonId) {
		historyMemoList = await getHistoryMemo(mokwonId);

		console.log("getMokwonId", mokwonId);
	}

	async function getHistoryMemo(mokwonId) {
		const user = await getUser();

		let { data } = await supabase
			.from("HISTORY_MEMO")
			.select("*")
			.eq("target_id", mokwonId)
			.eq("writer_id", user.id);

		// TODO: error 체크
		return data;
	}
</script>

<section class="mokwon-history-list-container">
	<div class="mokwon-history-list-header">
		<button class="btn btn-sm btn-primary">
			<i class="fa-solid fa-plus"></i> 메모추가
		</button>
	</div>
	<div class="mokwon-history-list-section list-group">
		{#each historyMemoList as historyMemo}
			<MokwonMemo historyMemoData={historyMemo} />
		{/each}
		<div class="list-group-item list-group-item-action">
			The current link item
		</div>
		<div class="list-group-item list-group-item-action">A second link item</div>
		<div class="list-group-item list-group-item-action">A third link item</div>
		<div class="list-group-item list-group-item-action">A fourth link item</div>
	</div>
</section>

<style>
	section.mokwon-history-list-container {
		padding: 0.5rem;
		height: 100%;
	}

	.mokwon-history-list-header {
		margin-bottom: 0.5rem;
	}
</style>
