<script>
    import { supabase } from "$lib/supabaseClient";
    import MeetingItem from './MeetingItem.svelte';
    import DateUtil from '$lib/utils/DateUtil.js';
    export let mokjang;
    export let mokjaId;
    let meetingList = [];
    $: meetingList;
    let mokjangIdx = mokjang.idx;
    
    getMeetingList();

    async function getMeetingList() {
        let {data: dataList} = await supabase
            .from("MEETING")
            .select("idx, meeting_title, place, meeting_date")
            .eq("mokjang_idx", mokjangIdx)
            .order("meeting_date", { ascending: false });

        dataList = dataList.map(data => {
            data.meeting_title = data.meeting_title ?? "";
            data.place = data.place ?? "";
            data.meeting_date = data.meeting_date ?? "";
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
                writer_id: mokjaId
            }),
            headers: {'Content-Type': 'application/json'}
        })

        const {isSuccess} = await response.json();
        if (isSuccess) getMeetingList();
        // DateUtil.formatDate(new Date())
    }
</script>

<style>
	@import './component_list.css';
</style>

<div class="list-container">
    <button class="btn btn-sm btn-primary add-btn" on:click={createMeeting}>
        <i class="fa-solid fa-people-group"></i> 모임 추가
    </button>
    <div class="list-wrap">
        <div class="list-group">
            {#each meetingList as {idx, meeting_title: title, place, meeting_date: date }}
                <MeetingItem {idx} {title} {date} {place} mokjang_idx={mokjangIdx}  />
            {/each}
        </div>
    </div>
</div>