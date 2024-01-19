<script>
	import MokwonInfo from './mokwonInfo.svelte';

	export let data;
	const {mokwonList, mokja_id} = data;
	let selectedMokwonInfo;

	async function getMokwonInfo(mokwonId) {
		const response = await fetch(`/api/mokwon?id=${mokwonId}`);
		const {mokwonInfo} = await response.json();
		selectedMokwonInfo = mokwonInfo.data;
	}
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

	.mokwon-item {
		display: flex;
		justify-content: space-between;
		padding: 0.25rem 0.5rem;
		border: 1px solid lightgray;
		border-radius: 4px;
		margin: 4px 0;
		cursor: pointer;
	}

	.mokwon-item > div {
		width: 25%;
	}

	.mokwon-item:hover {
		background-color: #c9e2ee;
	}
</style>

<div class="container mokwon-container">
	<div class="mokwon-container-divider">
		<div class="mokwon-divider-body">
			<header><h1>목원 리스트</h1></header>
			<section>
				<button class="btn btn-lg btn-success">추가</button>
				<div>
					{#each mokwonList as mokwon}
						<div class="mokwon-item" on:click={e => {getMokwonInfo(mokwon.id)}}>
							<div>{mokwon.name}</div>
							<div>{mokwon.type}</div>
							<div>{mokwon.USER_INFO?.birthday ?? ""}</div>
							<div>{mokwon.USER_INFO?.phone ?? ""}</div>
						</div>
					{/each}
				</div>
			</section>
		</div>
	</div>
	<div class="mokwon-container-divider">
		<div class="mokwon-divider-body">
			<header><h1>목원 정보</h1></header>
			<section>
				<MokwonInfo bind:selectedMokwonInfo={selectedMokwonInfo} mokjaId={mokja_id}/>
			</section> <!-- 컴포넌트로 감싸기 -->
		</div>
	</div>
</div>