<script>
    import {createEventDispatcher} from 'svelte';
	const dispatch = createEventDispatcher();

    export let groupIdx;
    export let name;
    export let memo;
    let outline = memo ? "" : "outline-";

    // 스크롤 이동

    async function removeParticipant() {
        if (confirm(`'${name}'을 참여자에서 삭제 하겠습니까?`)) {
            const response = await fetch('/api/meeting/participant', {
                method: 'DELETE',
                body: JSON.stringify({group_idx: groupIdx}),
                headers: { 'Content-Type': 'application/json' }
		    });
            
            if (!response.ok) alert("참여자 삭제 중 오류가 발생했습니다.");
            alert(`'${name}'가 삭제 되었습니다.`);
            dispatch("message");
        }
    }
</script>

<style>

</style>

<button type="button" class="btn btn-{outline}secondary btn-sm m-1">
    {name} <i class="fa-solid fa-xmark ms-2" on:click|stopPropagation={removeParticipant}></i>
</button>