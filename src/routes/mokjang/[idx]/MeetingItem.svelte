<script>
    import { supabase } from "$lib/supabaseClient";
	import {goto} from '$app/navigation';
	import {createEventDispatcher} from 'svelte';
	const dispatch = createEventDispatcher();

    export let mokjang_idx;
    export let number;
    export let idx;
    export let title;
    export let date;
    export let place;
    export let count;

    function gotoMeeting() {
        goto(`/meeting/${idx}?mokjang=${mokjang_idx}`);
    }

    async function deleteMeeting() {
        if (confirm("정말 모임을 삭제하시겠습니까?")) {
            
            try {
                const { error } = await supabase
                .from('MEETING')
                .delete()
                .eq('idx', idx);

                if (error) throw new "error";
            } catch (e) {
                console.error(e);
                alert("먼저 모임에서 목원 출석을 모두 취소시켜야 합니다.");
                return;
            }
          
            alert("삭제 되었습니다.");
            dispatch("refresh");
        }
    }
</script>

<style>
    a.meeting-list-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        text-decoration: none;
        color: black;
        padding: 0;
    }
    a.meeting-list-item > div {
        text-align: center;
    }
</style>

<!-- 날짜, 장소, 참여자, 참석수. 제목 -->
<a href="#" class="list-group-item list-group-item-action meeting-list-item" on:click={gotoMeeting}>
    <div style="width: 5%;">{number}</div>
    <div style="width: 25%;">{date}</div>
    <div style="width: 35%;">{title}</div>
    <div style="width: 15%;">{place}</div>
    <div style="width: 15%;">{count}</div>
    <div style="width: 5%;">
        <button class="btn" on:click|stopPropagation={deleteMeeting}>
            <i class="fa fa-trash"></i>
        </button>
    </div>
</a>

<!-- 
<a href="#" class="list-group-item list-group-item-action" aria-current="true" >
    <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">{title}</h5>
        <small>{date}</small>
    </div>
    <p class="mb-1">{place}</p>
    <small>
        <span>[{memberCount}]</span>
        {#each members as member}
            <span>'{member}'</span>&nbsp;
        {/each}
    </small>
</a>
 -->