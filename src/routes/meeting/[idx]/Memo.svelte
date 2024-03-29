<script>
	import userImg from "$lib/assets/user.svg";
	import { toasts }  from "svelte-toasts";
	import Toast from "$lib/components/toast/toast.svelte";
	import { onMount } from "svelte";
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();

	export let groupIdx;
	export let name;
	export let memo;
	export let profile_image;
	$: memo;
	export let comment;
	$: comment;
	let item;
	let areaMemo;
	let areaComment;
	onMount(adjustHeight);

	function keypressEvent(e) {
		if (e.key === "Enter" && e.ctrlKey) {
			e.preventDefault(); // 기존 Enter 기능을 제거
			save();
		}
	}

	async function save(e) {
		try {
			await fetch("/api/meeting/memo", {
				method: "PATCH",
				body: JSON.stringify({
					meeting_group_idx: groupIdx,
					content: memo,
					comment: comment,
				}),
				headers: { "content-type": "application/json" },
			});

			const type = e.target.getAttribute("data-type");
			const toast = toasts.add({ 
				type: 'success', 
				description: `'${name}'의 '${type}'가 수정 되었습니다.`,
			});

		} catch (e) {
			alert("저장에 실패했습니다.");
		}
	}

	function adjustHeight() {
		// height init
		areaMemo.style.height = "auto";
		areaComment.style.height = "auto";

		let maxHeight =
			Math.max(areaComment.scrollHeight, areaMemo.scrollHeight) + 2;
		areaMemo.style.height = maxHeight + "px";
		areaComment.style.height = maxHeight + "px";
	}

	function nameClickEvent() {
		dispatch("message");
	}
</script>

<div
	bind:this={item}
	class="memo-item list-group-item list-group-item-action"
	data-idx={groupIdx}
>
	<div>
		<img
			src={profile_image ?? userImg}
			alt="twbs"
			width="32"
			height="32"
			class="rounded-circle flex-shrink-0 me-3"
		/>
	</div>
	<div class="participant-name">
		<a href="#" class="link-dark link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover"
			on:click={nameClickEvent}>
			{name}
		</a>
	</div>
	<div class="participant-memo">
		<textarea
			class="editable-area form-control"
			data-type="메모"
			cols="30"
			placeholder="메모"
			bind:this={areaMemo}
			on:change={save}
			on:keydown={keypressEvent}
			on:input={adjustHeight}
			bind:value={memo}
		/>
	</div>
	<div class="participant-comment">
		<textarea
			class="editable-area form-control"
			data-type="코멘트"
			cols="30"
			placeholder="코멘트"
			bind:this={areaComment}
			on:change={save}
			on:keydown={keypressEvent}
			on:input={adjustHeight}
			bind:value={comment}
		/>
	</div>
</div>
<Toast />

<style>
	@keyframes background-change {
		0% {
			background-color: #d8edff;
		}
		100% {
			background-color: white;
		}
	}

	.memo-item {
		display: flex;
		align-items: center;
		padding: 0.25rem 0.5rem;
		background-color: white;
	}
	.memo-item.success {
		animation-name: background-change;
		animation-duration: 1s;
		animation-iteration-count: 1;
		animation-fill-mode: backwards;
	}
	.participant-name {
		width: 150px;
		padding: 0 0.25rem;
		display: flex;
		align-items: center;
	}
	.participant-memo {
		width: 60%;
		padding: 0 0.25rem;
	}
	.participant-memo > textarea {
		width: 100%;
		height: 100%;
	}
	.participant-comment {
		width: 40%;
		padding: 0 0.25rem;
	}
	.participant-comment > textarea {
		width: 100%;
		height: 100%;
	}

	.editable-area {
		height: auto;
		overflow: hidden auto;
		resize: none;
	}
	.editable-area::placeholder {
		color: #ddd;
	}
</style>
