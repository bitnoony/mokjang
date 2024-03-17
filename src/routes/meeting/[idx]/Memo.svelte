<script>
	import userImg from "$lib/assets/user.svg";
	import { onMount } from "svelte";
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
	let isSave = false;
	onMount(e => {
		adjustHeight();
	});

	function keypressEvent(e) {
		if (e.key === "Enter" && e.ctrlKey) {
			e.preventDefault(); // 기존 Enter 기능을 제거
			save();
		}
	}

	function blur() {
		save();
	}

	async function save() {
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
			isSave = true;
			setTimeout(() => {
				isSave = false;
			}, 1000);
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
</script>

<div
	bind:this={item}
	class="memo-item list-group-item list-group-item-action"
	class:success={isSave}
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
		{name}
	</div>
	<div class="participant-memo">
		<textarea
			class="editable-area form-control"
			cols="30"
			placeholder="메모"
			bind:this={areaMemo}
			on:blur={blur}
			on:keydown={keypressEvent}
			on:input={adjustHeight}
			bind:value={memo}
		/>
	</div>
	<div class="participant-comment">
		<textarea
			class="editable-area form-control"
			cols="30"
			placeholder="코멘트"
			bind:this={areaComment}
			on:blur={blur}
			on:keydown={keypressEvent}
			on:input={adjustHeight}
			bind:value={comment}
		/>
	</div>
</div>

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
