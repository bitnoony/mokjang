<!-- script -->
<script>
	import "bootstrap/dist/css/bootstrap.css";
	import bootstrapBundle from "bootstrap/dist/js/bootstrap.bundle.js?url";
	import "@fortawesome/fontawesome-free/css/all.min.css";
</script>

<style>
	@import './page.css';
	nav.layout-nav {
		height: 60px;
		width: 100vw;
		background-color: skyblue;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20px;
	}

	nav.layout-nav > div.mokjang-part {
		text-align: start;
		width: 25%;
	}
	nav.layout-nav > div.title-part {
		text-align: center;
		width: 50%;
	}
	nav.layout-nav > div.mokwon-part {
		text-align: end;
		width: 25%;
	}
</style>


<!-- dom -->
<svelte:head>
	<script src={bootstrapBundle}></script>
</svelte:head>
<nav class="layout-nav">
	<div class="mokjang-part">
		<a href="/mokjang/list" class="btn btn-secondary">
			<i class="fa-solid fa-layer-group"></i>
			목장 리스트
		</a>
		<button class="btn btn-secondary" on:click={() => {history.back()}}>
			<i class="fa-solid fa-arrow-left"></i>
			뒤로가기
		</button>
	</div>
	<div class="title-part">
		<span class="fw-bold fs-3">목장</span>
	</div>
	<div class="mokwon-part">
		<a href="/mokwon" class="btn btn-secondary">
			<i class="fa-solid fa-users"></i> 목원정보
		</a>
		<a href="/user-form" class="btn btn-secondary">
			<i class="fa-solid fa-user"></i> 목자정보
		</a>
	</div>
</nav>

<slot />
