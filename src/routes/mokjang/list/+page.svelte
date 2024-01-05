<script>
	export let data;
	const { mokjangList } = data;
</script>

<style>
	.mokjang-nav {
		margin: 20px 0 10px 0;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.card {
		height: 150px;
		cursor: pointer;
	}

	.card:hover {
		background-color: aliceblue;
		border-color: dodgerblue;
		color: dodgerblue;
	}

	.card:active {
		background-color: #def0ff;
		border-color: #147ce4;
		color: #147ce4;
	}

	.btn-gear {
		padding: 0.5rem;
		cursor: pointer;
		color: dimgray;
	}

	.btn-gear:hover {
		color: dodgerblue;
	}
</style>

<section class="container">
	<div class="mokjang-nav">
		<button class="me-1 btn btn-primary">
			<i class="fa-solid fa-plus"></i>
			추가
		</button>
	</div>
	{#each mokjangList as _, i}
		{#if i % 4 === 0}
		<div class="row">
			{#each [...mokjangList].splice(i, 4) as {idx, mokjang_name, area}, index (index)}
				<div data-idx="{idx}" class="p-2 col-lg-3 col-md-6 col-sm-12">
					<div class="card">
						<div class="card-body">
							<div class="d-flex justify-content-between align-items-center">
								<h5>{mokjang_name}</h5>
								<span data-idx="{idx}" class="btn-gear">
									<i class="fa-solid fa-gear"></i>
								</span>
							</div>
							<h6 class="card-subtitle mb-2 text-body-secondary">{area}</h6>
						</div>
					</div>
				</div>
			{/each}
		</div>
		{/if}
	{/each}
</section>