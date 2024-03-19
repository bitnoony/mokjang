<script>
	import { supabase, getUser } from "$lib/supabaseClient";
	import MokwonMemo from "./MokwonMemo.svelte";

	let historyMemoList = [];
	$: historyMemoList;
	let mokwonId;
	let writerId;

	export async function getMokwonHistory(inputMokwonId) {
		historyMemoList = await getHistoryMemo(inputMokwonId);
		mokwonId = inputMokwonId;
	}

	async function getHistoryMemo(inputMokwonId) {
		const user = await getUser();
		writerId = user.id;

		let { data, error } = await supabase
			.from("HISTORY_MEMO")
			.select("*")
			.eq("target_id", inputMokwonId)
			.eq("writer_id", writerId)
			.is('deleted_date', null)
			.order('memo_date', { ascending: false })
			.order('created_date', { ascending: false })

		if (error) {
			alert("목원 메모를 가져오는 중 문제가 발생했습니다.");
			return [];
		} else {
			return data;
		}
	}

	async function addMokwonMemo() {
		const dummyData = {
			target_id: mokwonId,
			writer_id: writerId,
			content: "",
		}

		const { data, error } = await supabase
			.from('HISTORY_MEMO')
			.insert([dummyData,]);

		if (error) {
			alert("문제가 생겼습니다.");
		}

		historyMemoList = await getHistoryMemo(mokwonId);
	}

	function itemRemove(e) {
		const {idx} = e.detail;
		historyMemoList = historyMemoList.filter(x => x.idx !== idx);
	}

	function refreshList() {
		getMokwonHistory(mokwonId);
	}
</script>

<section class="mokwon-history-list-container">
	<div class="mokwon-history-list-header">
		<button class="btn btn-sm btn-primary" on:click={addMokwonMemo}>
			<i class="fa-solid fa-plus"></i> 메모추가
		</button>
		<button class="btn btn-sm btn-outline-secondary" on:click={refreshList}>
			<i class="fa-solid fa-refresh"></i>
		</button>
	</div>
	<div class="mokwon-history-list-section list-group">
		{#each historyMemoList as historyMemo (historyMemo.idx)}
			<MokwonMemo historyMemoData={historyMemo} on:remove={itemRemove} />
		{/each}
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
