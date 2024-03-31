<script>
    import imgOneSheep from '$lib/assets/one_sheep.jpeg';
    import imgThreeSheep from '$lib/assets/three_sheep.jpeg';
	import { login } from "$lib/supabaseClient";

    function startFree() {
        login();
    }

    function startMokjaPlan() {
        alert("목자 플랜은 준비중입니다.");
    }
</script>

<style>
    .pricing-section {
        height: calc(100vh - 60px);
        overflow-y: auto;
        padding: 3rem 0;
    }

    .pricing-main-container {
        max-width: 600px;
        margin: auto;
    }
</style>

<section class="pricing-section">
    <header class="pricing-header px-3 pb-md-4 mx-auto text-center">
        <h1 class="fw-bold text-body-emphasis">요금제 (Pricing)</h1>
        <p class="fs-5 text-body-secondary">
            목장을 체험할 수 있도록 무료버전도 제공하고 있습니다.
        </p>
    </header>
    <main class="pricing-main-container">
        <div class="row row-cols-1 row-cols-md-2 mb-3 text-center">
            <div class="col">
                <div class="card mb-4 rounded-3 shadow-sm">
                    <div class="card-header py-3">
                        <h4 class="my-0 fw-bold">무료 플랜</h4>
                    </div>
                    <img class="w-100 border-bottom" src="{imgOneSheep}" alt="free">
                    <div class="card-body">
                        <h1 class="card-title pricing-card-title">
                            0￦<small class="text-body-secondary fw-light">/월</small>
                        </h1>
                        <ul class="list-unstyled mt-3 mb-4">
                            <li>모임 만들기</li>
                            <li>모임 - 목원 메모</li>
                            <li>모임 - 목원 코멘트</li>
                            <li>목원 메모</li>
                            <li>목원 히스토리</li>
                            <li class="mt-2">최대 10명의 목원 추가</li>
                            <li>최대 2개의 목장</li>
                        </ul>
                        <button type="button" 
                            class="w-100 btn btn-lg btn-outline-primary"
                            on:click={startFree}
                        >
                            가입 후 체험하기
                        </button>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card mb-4 rounded-3 shadow-sm">
                    <div class="card-header py-3">
                        <h4 class="my-0 fw-bold">목자 플랜</h4>
                    </div>
                    <img class="w-100 border-bottom" src="{imgThreeSheep}" alt="three">
                    <div class="card-body">
                        <h1 class="card-title pricing-card-title">
                            1,900￦<small class="text-body-secondary fw-light">/월</small>
                        </h1>
                        <ul class="list-unstyled mt-3 mb-4">
                            <li>모임 만들기</li>
                            <li>모임 - 목원 메모</li>
                            <li>모임 - 목원 코멘트</li>
                            <li>목원 메모</li>
                            <li>목원 히스토리</li>
                            <li class="mt-2">무제한 목원</li>
                            <li>무제한 목장</li>
                        </ul>
                        <button type="button" 
                            class="w-100 btn btn-lg btn-primary"
                            on:click={startMokjaPlan}
                        >
                            시작하기
                        </button>
                    </div>
                </div>
            </div>
            <!-- <div class="col">
                <div class="card mb-4 rounded-3 shadow-sm border-primary">
                    <div class="card-header py-3 text-bg-primary border-primary">
                        <h4 class="my-0 fw-normal">Enterprise</h4>
                    </div>
                    <div class="card-body">
                        <h1 class="card-title pricing-card-title">$29<small
                                class="text-body-secondary fw-light">/월</small></h1>
                        <ul class="list-unstyled mt-3 mb-4">
                            <li>30 users included</li>
                            <li>15 GB of storage</li>
                            <li>Phone and email support</li>
                            <li>Help center access</li>
                        </ul>
                        <button type="button" class="w-100 btn btn-lg btn-primary">Contact us</button>
                    </div>
                </div>
            </div> -->
        </div>

        <h2 class="display-6 text-center mb-4">Compare plans</h2>

        <div class="table-responsive">
            <table class="table text-center">
                <thead>
                    <tr>
                        <th style="width: 34%;"></th>
                        <th style="width: 22%;">무료 플랜</th>
                        <th style="width: 22%;">목자 플랜</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row" class="text-start">모임</th>
                        <td><i class="fa-solid fa-check"></i></td>
                        <td><i class="fa-solid fa-check"></i></td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-start">모임 메모/코멘트</th>
                        <td><i class="fa-solid fa-check"></i></td>
                        <td><i class="fa-solid fa-check"></i></td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-start">목원 메모</th>
                        <td><i class="fa-solid fa-check"></i></td>
                        <td><i class="fa-solid fa-check"></i></td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-start">목원 히스토리</th>
                        <td><i class="fa-solid fa-check"></i></td>
                        <td><i class="fa-solid fa-check"></i></td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-start">목장</th>
                        <td>최대 2개</td>
                        <td>무제한</td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-start">목원</th>
                        <td>최대 10명</td>
                        <td>무제한</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </main>
</section>