<script>
    import userImg from '$lib/assets/user.svg';
    import MokwonInfo from '../../mokwon/mokwonInfo.svelte';
    import {getMokwonList} from '../../mokwon/mokwon.js';
    export let data;
    let {meeting, userId} = data;
    let mokwonInfoComponent;
    let mokwonList = [];
    console.log(meeting);

    init();

    async function init() {
        const data = await getMokwonList(userId);
        mokwonList = data.mokwonList;
    }
    
</script>

<style>
    @import './page.css';
</style>

<section>
    <div class="meeting-container">
        <div class="meeting-info-wrap">
            <div class="meeting-info-group">
                <div class="meeting-name input-group">
                    <span class="input-group-text">모임이름</span>
                    <input type="text" class="form-control" placeholder="모임 이름을 적어주세요.">
                </div>
                <div class="meeting-info">
                    <div class="input-group mb-2">
                        <span class="input-group-text">날짜</span>
                        <input type="text" class="form-control" placeholder="날짜를 입력해 주세요.">
                    </div>
                    <div class="input-group mb-2">
                        <span class="input-group-text">장소</span>
                        <input type="text" class="form-control" placeholder="장소를 입력해 주세요.">
                    </div>
                    <textarea cols="30" rows="5" class="form-control meeting-comment" placeholder="코멘트를 입력해 주세요."></textarea>
                </div>
            </div>
            <div class="meeting-list-group">
                <div class="meeting-count ps-2">
                    목원 수: <span class="badge bg-primary rounded-pill">14</span>
                </div>
                <div class="meeting-list common-scroll">
                    <ul class="list-group">
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            A list item
                            <button class="btn btn-sm btn-danger">
                                <i class="fa fa-trash"></i>
                            </button>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            A second list item
                            <button class="btn btn-sm btn-danger">
                                <i class="fa fa-trash"></i>
                            </button>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            A third list item
                            <button class="btn btn-sm btn-danger">
                                <i class="fa fa-trash"></i>
                            </button>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            A third list item
                            <button class="btn btn-sm btn-danger">
                                <i class="fa fa-trash"></i>
                            </button>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            A third list item
                            <button class="btn btn-sm btn-danger">
                                <i class="fa fa-trash"></i>
                            </button>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            A third list item
                            <button class="btn btn-sm btn-danger">
                                <i class="fa fa-trash"></i>
                            </button>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            A third list item
                            <button class="btn btn-sm btn-danger">
                                <i class="fa fa-trash"></i>
                            </button>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            A third list item
                            <button class="btn btn-sm btn-danger">
                                <i class="fa fa-trash"></i>
                            </button>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            A third list item
                            <button class="btn btn-sm btn-danger">
                                <i class="fa fa-trash"></i>
                            </button>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            A third list item
                            <button class="btn btn-sm btn-danger">
                                <i class="fa fa-trash"></i>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="memo-info-wrap">사람 메모 코멘트</div>
    </div>
    <div class="mokwon-container">
        <div class="mokwon-list">
            <div class="list-group overflow-y-auto h-100 common-scroll">
                {#each mokwonList as mokwon}
                <a href="#" class="list-group-item list-group-item-action list-item d-flex align-items-center" aria-current="true" on:click={e => {mokwonInfoComponent.getMokwonInfo(mokwon.id)}}>
                    <img src="{mokwon?.profile_image ?? userImg}" alt="twbs" width="32" height="32" class="rounded-circle flex-shrink-0 me-3">
                    <div class="d-flex gap-2 w-100 justify-content-between">
                        <div>
                        <p class="mb-1">
                            {mokwon.name}
                            <span class="align-bottom badge text-bg-{mokwon.type === "목자" ? "danger" : "success"}">
                                {mokwon.type}
                            </span>
                        </p>
                        </div>
                    </div>
                    <div class="d-flex justify-content-end w-25">
                        <button class="btn btn-sm btn-primary" on:click|stopPropagation={() => {alert(mokwon.name)}}>
                            <i class="fa fa-plus"></i>출석
                        </button>
                    </div>
                </a>
                {/each}
            </div>
        </div>
        <div class="mokwon-info common-scroll">
            <MokwonInfo mokja_id={userId} bind:this={mokwonInfoComponent} />
        </div>
    </div>
</section>