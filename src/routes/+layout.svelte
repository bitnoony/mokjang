<!-- script -->
<script>
	import "bootstrap/dist/css/bootstrap.css";
	import bootstrapBundle from "bootstrap/dist/js/bootstrap.bundle.js?url";
	import "@fortawesome/fontawesome-free/css/all.min.css";
</script>

<!-- dom -->
<svelte:head>
	<script src={bootstrapBundle}></script>
</svelte:head>
<nav>
	<div>
		<a href="/mokjang/list" class="btn btn-primary">
			<i class="fa-solid fa-layer-group"></i>
			목장 리스트
		</a>
		<button class="btn btn-secondary" on:click={() => {history.back()}}>
			<i class="fa-solid fa-arrow-left"></i>
			뒤로가기
		</button>
	</div>
	<div>
		<h4>mokjang</h4>
	</div>
	<div>
		<a href="/mokwon" class="btn btn-primary rounded-circle">
			<i class="fa-solid fa-users"></i>
		</a>
		<a href="/user-form" class="btn btn-primary rounded-circle">
			<i class="fa-solid fa-user"></i>
		</a>
	</div>
</nav>

<slot />

<!-- style -->
<style>
	nav {
		height: 60px;
		width: 100vw;
		background-color: skyblue;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20px;
	}
</style>
