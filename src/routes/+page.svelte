<script>
	import imgWooncloud from '$lib/assets/wooncloud_logo.png';
	import imgBitnoony from '$lib/assets/noony_profile.png';
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
				<div class="feature-card">내 목장은 한눈에!</div>
			</div>
			<div class="col-sm-6 col-lg-3">
				<div class="feature-card">간편한 모임 관리</div>
			</div>
			<div class="col-sm-6 col-lg-3">
				<div class="feature-card">목원 관리를 손쉽게!</div>
			</div>
			<div class="col-sm-6 col-lg-3">
				<div class="feature-card">모임과 목원의 히스토리를 한곳에!</div>
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
		<!-- <div>
			<h1>후원</h1>
		</div> -->
		<footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
			<p class="col-md-4 mb-0 text-body-secondary">© 2024 Company, Inc</p>
			<ul class="nav col-md-4 justify-content-end">
				<li class="nav-item"><a href="/home/pricing" class="nav-link px-2 text-body-secondary">요금제</a></li>
				<li class="nav-item"><a href="/home/inquire" class="nav-link px-2 text-body-secondary">문의</a></li>
				<li class="nav-item"><a href="/home/terms" class="nav-link px-2 text-body-secondary">이용약관</a></li>
				<li class="nav-item"><a href="/home/privacy" class="nav-link px-2 text-body-secondary">개인정보처리방침</a></li>
			</ul>
		</footer>
	</div>
</section>

<style>
	@import "./homepage.css";
</style>
