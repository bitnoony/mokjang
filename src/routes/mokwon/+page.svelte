<script>
	import MokwonInfo from './mokwonInfo.svelte';
</script>

<style>
	.mokwon-container {
		display: flex;
		justify-content: center;
		align-items: flex-start;
		height: calc(100vh - 60px);
	}

	.mokwon-container-divider {
		width: 50%;
		padding: 1rem 0.5rem;
		height: 100%;
	}

	.mokwon-divider-body {
		border: 1px solid lightgray;
		border-radius: 10px;
		height: 100%;
	}

	.mokwon-divider-body > header {
		padding: 0.5rem 1rem;
		text-align: center;
	}

	.mokwon-divider-body > section {
		padding: 0.5rem 1rem;
	}
</style>

<div class="container mokwon-container">
	<div class="mokwon-container-divider">
		<div class="mokwon-divider-body">
			<header><h1>목원 리스트</h1></header>
			<section>
				<button class="btn btn-lg btn-success">추가</button>
			</section>
		</div>
	</div>
	<div class="mokwon-container-divider">
		<div class="mokwon-divider-body">
			<header><h1>목원 정보</h1></header>
			<section>
				<MokwonInfo />
			</section> <!-- 컴포넌트로 감싸기 -->
		</div>
	</div>
</div>