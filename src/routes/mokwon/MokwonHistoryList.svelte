<script>
	import { supabase, getUser } from "$lib/supabaseClient";
	import MokwonMemo from "./MokwonMemo.svelte";
	import MeetingHistory from "./MeetingHistory.svelte";

	let historyMemoList = [];
	let meetingHistoryList = [];
	let mergeHistoryList = [];
	$: historyMemoList;
	$: meetingHistoryList;
	$: mergeHistoryList;
	let mokwonId;
	let writerId;

	export async function getMokwonHistory(inputMokwonId) {
		historyMemoList = await getHistoryMemo(inputMokwonId);
		meetingHistoryList = await getMeetingHistory(inputMokwonId);
		mergeHistoryList = [...historyMemoList, ...meetingHistoryList];
		mergeHistoryList = mergeHistoryList.map(m => {
			m.uid = crypto.randomUUID();
			m.sort_date = m.memo_date ?? m.meeting_date;
			return m;
		});
		mergeHistoryList = mergeHistoryList.sort((a, b) => {
			return new Date(b.sort_date) - new Date(a.sort_date);
		});

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

		refreshList();
	}

	function refreshList() {
		getMokwonHistory(mokwonId);
	}

	async function getMeetingHistory(inputMokwonId) {
		const user = await getUser();
		writerId = user.id;

		let { data, error } = await supabase
			.from("mokwon_history_view")
			.select("*")
			.eq("attending_user", inputMokwonId)
			.eq("writer_id", writerId)

		if (error) {
			alert("목원 히스토리를 가져오는 중 문제가 발생했습니다.");
			return [];
		} else {
			return data;
		}
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
	<div class="mokwon-history-list-section common-scroll list-group">
		{#each mergeHistoryList as history (history.uid)}
			{#if history.memo_date}
				<MokwonMemo 
					historyMemoData={history}
					on:remove={refreshList} 
				/>
			{:else}
				<MeetingHistory 
					group_idx={history.group_idx}
					mokjang_name={history.mokjang_name}
					meeting_title={history.meeting_title}
					content={history.content} 
					comment={history.comment} 
					meeting_date={history.meeting_date}
					meeting_idx={history.meeting_idx}
					mokjang_idx={history.mokjang_idx}
				/>
			{/if}
		{/each}
	</div>
</section>

<style>
	section.mokwon-history-list-container {
		padding: 0.5rem;
		height: 100%;
	}

	.mokwon-history-list-section {
		height: calc(100% - 40px);
		overflow: hidden auto;
	}

	.mokwon-history-list-header {
		margin-bottom: 0.5rem;
	}
</style>
