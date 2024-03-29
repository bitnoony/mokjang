<script>
	import { toasts }  from "svelte-toasts";
	import Toast from "$lib/components/toast/toast.svelte";
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";

    export let group_idx;
    export let meeting_idx;
    export let mokjang_idx;
    export let mokjang_name;
    export let meeting_title;
    export let meeting_date;
    export let content;
    export let comment;

	let areaMemo;
	let areaComment;

    onMount(adjustHeight);

	function adjustHeight() {
		// height init
		areaMemo.style.height = "auto";
		areaComment.style.height = "auto";

		let maxHeight =
			Math.max(areaComment.scrollHeight, areaMemo.scrollHeight) + 2;
		areaMemo.style.height = maxHeight + "px";
		areaComment.style.height = maxHeight + "px";
	}

	async function update(e) {
        try {
			await fetch("/api/meeting/memo", {
				method: "PATCH",
				body: JSON.stringify({
					meeting_group_idx: group_idx,
					content: content,
					comment: comment,
				}),
				headers: { "content-type": "application/json" },
			});

            const toast = toasts.add({ 
				type: 'success', 
				description: '수정 되었습니다.',
			});
		} catch (e) {
			alert("저장에 실패했습니다.");
		}
    }

    function gotoMeeting() {
        goto(`/meeting/${meeting_idx}?mokjang=${mokjang_idx}`);
    }
</script>

<style>
    .mokwon-meeting-wrap {
        width: 100%;
        background-color: #EBF5FB;
    }

    .mokwon-meeting-wrap > .meeting-data-wrap {
        display: flex;
        justify-content: space-between;
        font-weight: bold;
        color: #333;
        margin-bottom: 0.3rem;
        padding: 0 0.1rem;
    }

    .mokwon-meeting-wrap > .meeting-content-wrap {
        display: flex;
        align-items: stretch;
        justify-content: space-between;
        width: 100%;
    }

    .mokwon-meeting-wrap 
    > .meeting-content-wrap 
    > .go-meeting-button {
        width: 50px;
        text-align: center;
    }

    .mokwon-meeting-wrap 
    > .meeting-content-wrap 
    > .memo-wrap {    
        width: calc((100% - 50px) * 0.7);
        display: flex;
        align-items: center;
    }
    .mokwon-meeting-wrap 
    > .meeting-content-wrap 
    > .comment-wrap {    
        width: calc((100% - 60px) * 0.3);
        display: flex;
        align-items: center;
    }

    .mokwon-meeting-wrap textarea {
		resize: none;
    }
</style>

<div class="list-group-item mokwon-meeting-wrap">
    <div class="meeting-data-wrap">
        <span class="me-3"><b>모임 날짜</b> : {meeting_date}</span>
        <span class="me-3"><b>모임 이름</b> : {meeting_title}</span>
        <span class="me-3"><b>목장 이름</b> : &#91;{mokjang_name}&#93;</span>
    </div>
    <div class="meeting-content-wrap">
        <div class="memo-wrap">
            <textarea placeholder="메모를 입력하세요" class="form-control" rows="1"
                bind:this={areaMemo} on:input={adjustHeight}
                bind:value={content} on:change={update}
            ></textarea>
        </div>
        <div class="comment-wrap">
            <textarea placeholder="코멘트를 입력하세요" class="form-control" rows="1"
                bind:this={areaComment} on:input={adjustHeight}
                bind:value={comment} on:change={update}
            ></textarea>
        </div>
        <div class="go-meeting-button">
            <button class="btn btn-outline-primary" on:click={gotoMeeting}>
                <i class="fa-solid fa-door-open"></i>
            </button>
        </div>
    </div>

</div>
<Toast />