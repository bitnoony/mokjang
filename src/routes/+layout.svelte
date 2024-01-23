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
		<a href="#" class="btn btn-primary">
			<i class="fa-solid fa-grip"></i>
		</a>
	</div>
	<div>
		<h4>mokjang</h4>
	</div>
	<div>
		<a href="#" class="btn btn-primary rounded-circle">
			<i class="fa-solid fa-users"></i>
		</a>
		<a href="#" class="btn btn-primary rounded-circle">
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
