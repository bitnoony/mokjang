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
	<input type="date" value="{memo_date}" class="form-control me-1" 
		on:change={memoUpdate}
	>
	<div class="ms-1 d-flex align-items-center w-100">
		<textarea placeholder="메모를 입력하세요" class="form-control" rows="1"
			bind:this={areaMemo} on:input={adjustHeight} on:change={memoUpdate}
		>{content}</textarea>
		<button class="ms-1 btn btn-sm btn-danger" title="삭제" on:click={memoDelete}>
			<i class="fa-solid fa-xmark"></i>
		</button>
	</div>
</div>
<Toast />

<style>
	.mokwon-memo-wrap {
		display: flex;
		align-items: flex-start;
	}

	.mokwon-memo-wrap > input[type='date'] {
		width: 180px;
		border: 0;
	}

	.mokwon-memo-wrap > div > textarea {
		resize: none;
	}
</style>
