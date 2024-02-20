<script>
    import { supabase } from "$lib/supabaseClient";
    import userImg from '$lib/assets/user.svg';
    import MokwonInfo from '../../mokwon/mokwonInfo.svelte';
    import Participant from './Participant.svelte';
    import {getMokwonList} from '../../mokwon/mokwon.js';
    export let data;
    let {meeting, userId} = data;
    let mokwonInfoComponent;
    let mokwonList = [];
    let participantList = [];
    $:participantList;
    // console.log(meeting);

    init();

    async function init() {
        const data = await getMokwonList(userId);
        mokwonList = data.mokwonList;
        getParticipantList();
    }

    async function getParticipantList() {
        const meetingIdx = meeting.idx;
        let {data} = await supabase
            .from('MEETING_GROUP')
            .select("*, USERS (name), MEMO (content)")
	        .eq('meeting_idx', meetingIdx);

        participantList = data.map(p => {
            return {
                groupIdx: p.group_idx,
                name: p.USERS.name,
                memo: p.MEMO[0]?.content ?? ""
            }
        });
    }

    async function makeAttendance(mokwonId) {
        let result;
        const meetingIdx = meeting.idx;
        try {
            result = await fetch('/api/meeting/participant', {
                method: "POST",
                body: JSON.stringify({
                    meeting_idx: meetingIdx,
                    id: mokwonId
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!result.ok) throw "실패";
        } catch (e) {
            alert("출석 중 문제가 발생했습니다.");
            console.error(e);
        }

        // 리프레시
        getParticipantList();
    }
    
</script>

<style>
    @import './page.css';
</style>

<section>
    <div class="meeting-container">
        <div class="meeting-info-wrap">
            <div class="meeting-info-group">
                <div class="meeting-name input-group">
                    <span class="input-group-text">모임이름</span>
                    <input type="text" class="form-control" placeholder="모임 이름을 적어주세요.">
                </div>
                <div class="meeting-info">
                    <div class="input-group mb-2">
                        <span class="input-group-text">날짜</span>
                        <input type="text" class="form-control" placeholder="날짜를 입력해 주세요.">
                    </div>
                    <div class="input-group mb-2">
                        <span class="input-group-text">장소</span>
                        <input type="text" class="form-control" placeholder="장소를 입력해 주세요.">
                    </div>
                    <textarea cols="30" rows="5" class="form-control meeting-comment" placeholder="코멘트를 입력해 주세요."></textarea>
                </div>
            </div>
            <div class="meeting-list-group">
                <div class="meeting-count ps-2">
                    목원 수: {participantList.length}
                </div>
                <div class="meeting-list common-scroll">
                    {#each participantList as {groupIdx, name, memo}}
                        <Participant {groupIdx}, {name} {memo} on:message={getParticipantList} />
                    {/each}
                </div>
            </div>
        </div>
        <div class="memo-info-wrap">사람 메모 코멘트</div>
    </div>
    <div class="mokwon-container">
        <div class="mokwon-list">
            <div class="list-group overflow-y-auto h-100 common-scroll">
                {#each mokwonList as mokwon}
                <a href="#" class="list-group-item list-group-item-action list-item d-flex align-items-center" aria-current="true" on:click={e => {mokwonInfoComponent.getMokwonInfo(mokwon.id)}}>
                    <img src="{mokwon?.profile_image ?? userImg}" alt="twbs" width="32" height="32" class="rounded-circle flex-shrink-0 me-3">
                    <div class="d-flex gap-2 w-100 justify-content-between">
                        <div>
                        <p class="mb-1">
                            {mokwon.name}
                            <span class="align-bottom badge text-bg-{mokwon.type === "목자" ? "danger" : "success"}">
                                {mokwon.type}
                            </span>
                        </p>
                        </div>
                    </div>
                    <div class="d-flex justify-content-end w-25">
                        <button class="btn btn-sm btn-primary" on:click|stopPropagation={() => {makeAttendance(mokwon.id)}}>
                            <i class="fa fa-plus"></i>출석
                        </button>
                    </div>
                </a>
                {/each}
            </div>
        </div>
        <div class="mokwon-info common-scroll">
            <MokwonInfo mokja_id={userId} bind:this={mokwonInfoComponent} on:message={init} />
        </div>
    </div>
</section>