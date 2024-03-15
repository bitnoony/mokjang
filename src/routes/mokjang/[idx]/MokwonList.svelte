<script>
    import {getUserListWithMokwon} from '../../mokwon/mokwon.js';
    import lambImg from '$lib/assets/lamb.svg';
    import userImg from '$lib/assets/user.svg';
    
    export let mokjang;
    export let mokjaId;
    let mokwonList = [];
    $: mokwonList;
    init();

    async function init() {
        const {mokwonList: list} = await getUserListWithMokwon(mokjaId, mokjang.idx);
        mokwonList = list;
    }

    async function changeMokwonStatus(e, mokwon) {
        let alertMsg = "";
        const isMokwonCheck = e.target.checked;
        if (e.target.checked) {
            alertMsg = "정말로 목장에 들여오시겠습니까?";
        } else {
            alertMsg = "정말로 목장에서 내보내시겠습니까?";
        }

        const mokjangIdx = mokjang.idx;
        const {id: mokwonId, type, isMokwon} = mokwon;

        if (type === "목자") {
            return;
        }
        if (!confirm(alertMsg)) {
            e.target.checked = !isMokwonCheck;
            mokwon.isMokwon = !isMokwonCheck;
            return;
        }

        if (isMokwonCheck) {
            const response = await fetch("/api/mokjang/mokwon", {
                method: "POST",
                body: JSON.stringify({
                    mokjang_idx: mokjangIdx,
                    user_id: mokwonId
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const {isSuccess} = await response.json();

            if (isSuccess) {
                alert("목원으로 등록되었습니다.");
                init();
            }
        } else if (!isMokwonCheck) {
            const response = await fetch("/api/mokjang/mokwon", {            
                method: "DELETE",
                body: JSON.stringify({
                    mokjang_idx: mokjangIdx,
                    user_id: mokwonId
                }),
                headers: {'Content-Type': 'application/json'}
            });

            const {isSuccess} = await response.json();

            if (isSuccess) {
                alert("목원을 내보냈습니다.");
                init();
            }
        }
    }
</script>

<style>
	@import './component_list.css';

    .mokwon-list-item {
        display: flex;
        align-items: center;
        padding: 0.25rem 0.5rem;
        width: 100%;
    }
</style>

<div class="list-container">
    <div class="list-wrap common-scroll">
        <div class="list-group">
            {#each mokwonList as mokwon}
            <li class="list-group-item list-group-item-action list-item mokwon-list-item" aria-current="true">
                <input class="form-check-input me-3 c-pointer" type="checkbox"
                    bind:checked={mokwon.isMokwon} disabled={mokwon.type === "목자"}
                    on:click={e => {changeMokwonStatus(e, mokwon)}}>
                <div class="d-flex align-items-center justify-content-between w-100">
                    <div class="d-flex align-items-center">
                        <img src="{mokwon?.profile_image ?? userImg}" alt="twbs" width="32" height="32" class="rounded-circle flex-shrink-0 me-3">
                        <span>{mokwon.name}&nbsp;</span>
                        <span class="ms-1 align-bottom badge text-bg-{mokwon.type === "목자" ? "danger" : "success"}">
                            {mokwon.type}
                        </span>
                    </div>
                    <div class="d-flex align-items-center">
                        {#if mokwon.isMokwon}
                            <span class="badge text-bg-secondary d-flex align-items-center">
                                {mokjang.mokjang_name}
                            </span>
                        {/if}
                    </div>
                </div>
            </li>
            {/each}
        </div>
    </div>
</div>