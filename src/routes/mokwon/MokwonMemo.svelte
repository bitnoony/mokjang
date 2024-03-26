<script>
	import { supabase } from "$lib/supabaseClient";
	import { toasts }  from "svelte-toasts";
	import { createEventDispatcher, onMount } from "svelte";
	import Toast from "$lib/components/toast/toast.svelte";

	export let historyMemoData;
	const { idx, memo_date, writer_id, content } = historyMemoData;
	const dispatch = createEventDispatcher();
	let areaMemo;

	onMount(adjustHeight);

	function adjustHeight() {
		areaMemo.style.height = "auto";
		areaMemo.style.height = `${areaMemo.scrollHeight + 2}px`;
	}

	async function memoUpdate(e) {
		const target = e.target;
		const value = target.value;
		const type = target.type;
		let targetColumn = "";

		switch (type.toLowerCase()) {
			case "textarea": 
				targetColumn = "content";
			break;
			case "date": 
				targetColumn = "memo_date";
			break;
			default: break;
		}

		if (!targetColumn) return;
		
		const { data, error } = await supabase
			.from('HISTORY_MEMO')
			.update({ 
				[targetColumn]: value,
				modified_date: new Date().toISOString()
			 })
			.eq('idx', idx)
			.eq('writer_id', writer_id);

		if (error) {
			alert ("목원 메모를 수정하는데 문제가 발생했습니다.");
		} else {
			const toast = toasts.add({ 
				type: 'success', 
				description: '수정 되었습니다.',
			});
		}
	}

	async function memoDelete(e) {
		if (confirm("정말로 삭제 하시겠습니까?")) {
			const { error } = await supabase
			.from('HISTORY_MEMO')
			.update({ deleted_date: new Date().toISOString() })
			.eq('idx', idx)
			.eq('writer_id', writer_id)

			if (error) {
				alert ("목원 메모를 삭제하는데 문제가 발생했습니다.");
			} else {
				dispatch("remove", {idx});
			}
		}
	}
</script>

<div class="list-group-item mokwon-memo-wrap">
	<div class="memo-date-wrap">
		<span>메모 날짜 : </span>
		<input type="date" value="{memo_date}" 
			class="form-control me-1" 
			on:change={memoUpdate}
		>
	</div>
	<div class="ms-1 d-flex align-items-center w-100">
		<textarea placeholder="메모를 입력하세요" class="form-control" rows="1"
			bind:this={areaMemo} on:input={adjustHeight} on:change={memoUpdate}
		>{content}</textarea>
		<button class="ms-1 btn btn-sm btn-outline-danger" title="삭제" on:click={memoDelete}>
			<i class="fa-solid fa-xmark"></i>
		</button>
	</div>
</div>
<Toast />

<style>
	.mokwon-memo-wrap {
		background-color: #FEF9E7;
	}

	.mokwon-memo-wrap > .memo-date-wrap {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		font-weight: bold;
		margin-bottom: 0.3rem;
	}

	.mokwon-memo-wrap > .memo-date-wrap > input[type='date'] {
		width: 130px;
		border: 0;
		background-color: transparent;
		font-weight: bold;
		padding: 0 6px;
	}

	.mokwon-memo-wrap > div > textarea {
		resize: none;
	}
	.mokwon-memo-wrap > div > button {
		width: 44px;
		height: 38px;
		margin: 0 3px;
		font-size: large;
	}
</style>
