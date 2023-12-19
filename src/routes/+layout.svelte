<!-- script -->
<script></script>

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

<!-- dom -->
<svelte:head>
	<link rel="stylesheet" href="/bootstrap/css/bootstrap.css" />
	<link rel="stylesheet" href="/fa/all.min.css" />
	<script src="/fa/all.min.js"></script>
</svelte:head>
<nav>
	<div>
		<a href="#" class="btn btn-primary">
			<i class="fa-solid fa-bars"></i>
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

<slot></slot>