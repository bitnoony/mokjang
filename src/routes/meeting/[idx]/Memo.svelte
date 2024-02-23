<script>
    export let groupIdx;
    export let name;
    export let memo;
    $:memo;
    export let comment;
    $:comment;
    let item;
    let isSave = false;

    function keypressEvent() {
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
                headers: {"content-type": "application/json",},
            });
            isSave = true;
            setTimeout(() => {isSave = false;}, 1000);
        } catch (e) {
            alert("저장에 실패했습니다.");
        }
    }

    function adjustHeight(e) {
        // TODO: 부모 높이가 크면 부모의 높이 (100%) 아니면 내 높이로 설정하기.
        const $textarea = e.target ?? e;
        $textarea.style.minHeight = 'auto'; // 기존 높이 초기화
        let scrollHeight = 0;
        for (const area of item.querySelectorAll(".editable-area")) {
            scrollHeight = Math.max(scrollHeight, area.scrollHeight);
        }
        $textarea.style.minHeight = scrollHeight + 'px'; // 새로운 높이 적용
    }
</script>

<style>
    @keyframes background-change {
        0% { border-color: green; }
        100% { border-color: lightgray; }
    }

    .memo-item {
        display: flex;
        padding: 0.5rem 1rem;
        border: 1px solid lightgray;
        background-color: ghostwhite;
        border-radius: 10px;
        margin: 0.5rem 0;
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
    .participant-memo > textarea { width: 100%; height: 100%; }
    .participant-comment { 
        width: 40%;
        padding: 0 0.25rem;
    }
    .participant-comment > textarea { width: 100%; height: 100%; }

    .editable-area {
        height: auto;
        overflow: hidden;
        resize: none;
    }
</style>

<div bind:this={item} class="memo-item" class:success={isSave} data-idx={groupIdx}>
    <div class="participant-name">
        {name}
    </div>
    <div class="participant-memo">
        <textarea class="editable-area form-control" cols="30" rows="1" on:input={adjustHeight} on:blur={blur} on:keydown={keypressEvent} bind:value={memo} />
    </div>
    <div class="participant-comment">
        <textarea class="editable-area form-control" cols="30" rows="1" on:input={adjustHeight} on:blur={blur} on:keydown={keypressEvent} bind:value={comment} />
    </div>
</div>