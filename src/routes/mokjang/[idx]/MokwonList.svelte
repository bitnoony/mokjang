<script>
    import {getMokwonList} from '../../mokwon/mokwon.js';
    import lambImg from '$lib/assets/lamb.svg';
    import userImg from '$lib/assets/user.svg';
    
    export let mokjang;
    export let mokjaId;
    let mokwonList = [];
    $: mokwonList;
    init();

    async function init() {
        const {mokwonList: list} = await getMokwonList(mokjaId);
        mokwonList = list;
    }
</script>

<style>
	@import './component_list.css';

    .list-item {
        display: flex;
        align-items: center;
        padding: 1rem;
    }
</style>

<div class="list-container">
    <div class="list-wrap">
        <div class="list-group">
            {#each mokwonList as mokwon}
            <a href="#" class="list-group-item list-group-item-action list-item" aria-current="true">
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
                        <span class="mx-2">
                            <i class="fa-solid fa-cake-candles"></i>&nbsp;
                            { 
                                mokwon?.USER_INFO?.birthday
                                ? mokwon?.USER_INFO?.birthday?.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3') 
                                : "-" 
                            }
                        </span>
                        <span class="mx-2">
                            <i class="fa-solid fa-mobile"></i>&nbsp;
                            { 
                                mokwon?.USER_INFO?.phone
                                ? mokwon?.USER_INFO?.phone?.replace(/(\d{3})(\d{3,4})(\d{3,4})/, '$1-$2-$3') 
                                : "-" 
                            }
                        </span>
                        <span class="mx-2">
                            <i class="fa-solid fa-heart"></i>&nbsp;
                            {mokwon?.USER_INFO?.partner ? mokwon?.USER_INFO?.partner : "없음"}
                        </span>
                    </p>
                    </div>
                    <small class="opacity-50 text-nowrap">

                    </small>
                </div>
            </a>
            {/each}
        </div>
    </div>
</div>