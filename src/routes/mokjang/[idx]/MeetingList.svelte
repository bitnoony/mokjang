<script>
	import imgMeeting from '$lib/assets/meeting_300.png';
	import { supabase } from "$lib/supabaseClient";
	import MeetingItem from "./MeetingItem.svelte";
	export let mokjang;
	export let mokjaId;
	let meetingList = [];
	$: meetingList;
	let mokjangIdx = mokjang.idx;

	getMeetingList();

	async function getMeetingList() {
		let { data: dataList } = await supabase
			.from("MEETING")
			.select(
				`idx, meeting_title, place, meeting_date, MEETING_GROUP("meeting_idx")`,
			)
			.eq("mokjang_idx", mokjangIdx)
			.order("meeting_date", { ascending: false });

		dataList = dataList.map(data => {
			data.meeting_title = data.meeting_title ?? "";
			data.place = data.place ?? "";
			data.meeting_date = data.meeting_date ?? "";
			data.count = data.MEETING_GROUP.length;
			return data;
		});

		meetingList = [...dataList];
	}

	async function createMeeting() {
		// 빈 모임 생성
		const response = await fetch("/api/meeting", {
			method: "POST",
			body: JSON.stringify({
				mokjang_idx: mokjangIdx,
				writer_id: mokjaId,
			}),
			headers: { "Content-Type": "application/json" },
		});

		const { isSuccess } = await response.json();
		if (isSuccess) getMeetingList();
		// DateUtil.formatDate(new Date())
	}
</script>

<div class="list-container">
	<button class="btn btn-sm btn-primary add-btn" on:click={createMeeting}>
		<i class="fa-solid fa-people-group"></i> 모임 추가
	</button>
	<div class="list-wrap meeting-list-wrap common-scroll">
		{#if meetingList.length === 0}
		<div class="my-5 d-flex-center flex-column">
			<img src="{imgMeeting}" alt="add_meeting">
			<h4 class="my-3 fw-bold">모임을 만들어봐요.</h4>
		</div>
		{:else}
		<div class="list-group">
			{#each meetingList as { idx, meeting_title: title, place, meeting_date: date, count }, i}
				<MeetingItem
					{idx}
					{title}
					{date}
					{place}
					mokjang_idx={mokjangIdx}
					{count}
					number={meetingList.length - i}
					on:refresh={getMeetingList}
				/>
			{/each}
		</div>
		{/if}
	</div>
</div>

<style>
	@import "./component_list.css";
</style>
