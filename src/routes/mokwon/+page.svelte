<script>
	import MokwonInfo from './mokwonInfo.svelte';
	import {getMokwonList} from './mokwon.js';

	export let data;
	let mokwonInfoComponent;
	let {mokwonList, mokja_id} = data;

	async function getMokwonInfo(mokwonId) {
		mokwonInfoComponent.getMokwonInfo(mokwonId);
	}

	async function refreshMokwonList() {
		const result = await getMokwonList(mokja_id);
		mokwonList = result.mokwonList;
	}

	function addMokwon() {
		mokwonInfoComponent.getMokwonInfo();
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
			<section style="height: calc(100% - 100px);">
				<button class="btn btn-sm btn-success" on:click={addMokwon}>추가</button>
				<div class="overflow-y-auto h-100">
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
				<MokwonInfo 
				mokja_id={mokja_id}
				bind:this={mokwonInfoComponent}
				on:message={refreshMokwonList}
				/>
			</section>
		</div>
	</div>
</div>