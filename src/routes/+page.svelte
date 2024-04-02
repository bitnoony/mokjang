<script>
	import { getUser } from "$lib/supabaseClient";
	import imgWooncloud from '$lib/assets/wooncloud_logo.png';
	import imgBitnoony from '$lib/assets/noony_profile.png';
	import title from '$lib/utils/LayoutTitle';

	init();

	async function init() {
		const user = await getUser();
		if (user) {
			const {user_metadata: {name}} = user;
			$title = `${name}의 MOKJANG`;
		}
	}
</script>

<svelte:head>
	<title>목장 MOKJANG</title>
</svelte:head>

<section class="homepage-section">
	<div class="container">
		<div class="cover-wrap my-5">
			<div class="homepage-cover-image">&nbsp;</div>
			<article class="homepage-cover-content">
				<h1 class="mb-3">MOKJANG</h1>
				<h4>목원들과 함께 할 공간.</h4>
				<h4>여기 목장만 있으면, 목원들과 모임을 간편하게!</h4>
			</article>
		</div>
		<div class="homepage-feature-particle row">
			<div class="col-sm-6 col-lg-3">
				<div class="feature-card">여러 목장 관리</div>
			</div>
			<div class="col-sm-6 col-lg-3">
				<div class="feature-card">손쉬운 모임!</div>
			</div>
			<div class="col-sm-6 col-lg-3">
				<div class="feature-card">쉬운 메모와 코멘트</div>
			</div>
			<div class="col-sm-6 col-lg-3">
				<div class="feature-card">목원의 활동을 한눈에!</div>
			</div>
		</div>
		<div class="my-3"><hr></div>
		<div class="w-100 row">
			<div class="col-lg-6">
				<div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative bg-white">
					<div class="col p-4 d-flex flex-column position-static">
						<strong class="d-inline-block mb-2 text-primary-emphasis">개발자</strong>
						<h3 class="mb-0">송집사 (bitnoony)</h3>
						<p class="card-text mb-auto">소개</p>
						<div class="d-flex">
							<a href="https://blog.naver.com/bitnoony2" class="mx-1 btn btn-primary" target="_blank">
								<i class="fa-brands fa-blogger-b"></i> 블로그
							</a>
							<a href="https://github.com/bitnoony" class="mx-1 btn btn-secondary" target="_blank">
								<i class="fa-brands fa-github"></i> 깃허브
							</a>
						</div>
					</div>
					<div class="col-auto d-none d-lg-block">
						<img src="{imgBitnoony}" alt="bitnoony" width="250" height="250">
					</div>
				</div>
			</div> 
			<div class="col-lg-6">
				<div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative bg-white">
					<div class="col p-4 d-flex flex-column position-static">
						<strong class="d-inline-block mb-2 text-primary-emphasis">개발자</strong>
						<h3 class="mb-0">운구름 (wooncloud)</h3>
						<p class="card-text mb-auto">소개</p>
						<div class="d-flex">
							<a href="https://wooncloud.tistory.com" class="mx-1 btn btn-primary" target="_blank">
								<i class="fa-brands fa-blogger-b"></i> 블로그
							</a>
							<a href="https://github.com/wooncloud" class="mx-1 btn btn-secondary" target="_blank">
								<i class="fa-brands fa-github"></i> 깃허브
							</a>
						</div>
					</div>
					<div class="col-auto d-none d-lg-block">
						<img src="{imgWooncloud}" alt="wooncloud" width="250" height="250" class="bg-white p-2">
					</div>
				</div>
			</div>
		</div>
		<div>
			<h1>후원</h1>
		</div>
		<footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
			<p class="col-md-4 mb-0 text-body-secondary">© 2024 Company, Inc</p>
		
			<a href="/" class="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
				<svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg>
			</a>
			<ul class="nav col-md-4 justify-content-end">
			<!-- <li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">Features</a></li> -->
			<!-- <li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">About</a></li> -->
			<li class="nav-item"><a href="/home/price" class="nav-link px-2 text-body-secondary">Pricing</a></li>
			<li class="nav-item"><a href="/home/faq" class="nav-link px-2 text-body-secondary">FAQs</a></li>
			<li class="nav-item"><a href="/home/terms" class="nav-link px-2 text-body-secondary">Terms</a></li>
			<li class="nav-item"><a href="/home/privacy" class="nav-link px-2 text-body-secondary">Privacy</a></li>
			</ul>
		</footer>
	</div>
</section>

<style>
	@import "./homepage.css";
</style>
