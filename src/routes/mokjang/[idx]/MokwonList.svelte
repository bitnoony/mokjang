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

    async function changeMokwonStatus(mokwon) {
        const mokjangIdx = mokjang.idx;
        const {id: mokwonId, type, isMokwon} = mokwon;
        if (type === "목자") return;

        if (isMokwon && confirm("정말로 목장에서 내보내시겠습니까?")) {
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
        } else if (!isMokwon && confirm("정말로 목장에 들여오시겠습니까")) {
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
        }
    }
</script>

<style>
	@import './component_list.css';

    .list-item {
        display: flex;
        align-items: center;
        padding: 1rem;
    }

    .lamb {
        background-color: mistyrose;
        border: 1px solid #9a746f;
        border-radius: 24px;
    }
</style>

<div class="list-container">
    <div class="list-wrap">
        <div class="list-group">
            {#each mokwonList as mokwon}
            <a href="#" class="list-group-item list-group-item-action list-item" aria-current="true" on:click={changeMokwonStatus(mokwon)}>
                <img src="{mokwon?.profile_image ?? userImg}" alt="twbs" width="32" height="32" class="rounded-circle flex-shrink-0 me-3">
                <div class="d-flex gap-2 w-100 justify-content-between">
                    <div>
                    <h6 class="mb-1">
                        {mokwon.name}
                        <span class="align-bottom badge text-bg-{mokwon.type === "목자" ? "danger" : "success"}">
                            {mokwon.type}
                        </span>
                    </h6>
                    <p class="mb-0 opacity-75">
                        <span class="mx-1">
                            <i class="fa-solid fa-cake-candles"></i>&nbsp;
                            { 
                                mokwon?.USER_INFO?.birthday
                                ? mokwon?.USER_INFO?.birthday?.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3') 
                                : "-" 
                            }
                        </span>
                        <span class="mx-1">
                            <i class="fa-solid fa-mobile"></i>&nbsp;
                            { 
                                mokwon?.USER_INFO?.phone
                                ? mokwon?.USER_INFO?.phone?.replace(/(\d{3})(\d{3,4})(\d{3,4})/, '$1-$2-$3') 
                                : "-" 
                            }
                        </span>
                        <span class="mx-1">
                            <i class="fa-solid fa-heart"></i>&nbsp;
                            {mokwon?.USER_INFO?.partner ? mokwon?.USER_INFO?.partner : "없음"}
                        </span>
                    </p>
                    </div>
                    {#if mokwon.isMokwon}
                    <img src="{lambImg}" alt="목원" width="48" height="48" class="lamb">
                    {/if}
                </div>
            </a>
            {/each}
        </div>
    </div>
</div>