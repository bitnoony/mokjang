<script>
	import imgSheep3 from "$lib/assets/sheep_three.png";
	import MokwonInfo from "./mokwonInfo.svelte";
	import MokwonHistoryList from "./MokwonHistoryList.svelte";
	import { getMokwonList } from "./mokwon.js";
	import title from '$lib/utils/LayoutTitle';
	$title = "목원 정보";

	export let data;
	let mokwonInfoComponent;
	let mokwonHistoryListComponent;
	let { mokwonList, mokja_id } = data;

	async function getMokwonInfo(mokwonId) {
		mokwonInfoComponent.getMokwonInfo(mokwonId);
		mokwonHistoryListComponent.getMokwonHistory(mokwonId);
	}

	async function refreshMokwonList() {
		const result = await getMokwonList(mokja_id);
		mokwonList = result.mokwonList;
	}

	function addMokwon() {
		mokwonInfoComponent.getMokwonInfo();
	}
</script>

<svelte:head>
	<title>목원관리 :: 목장 MOKJANG</title>
</svelte:head>

<div class="mokwon-container">
	<div class="mokwon-container-divider list">
		<div class="mokwon-divider-body">
			<section class="mokwon-list-section">
				<div class="mb-2">
					<button class="btn btn-sm btn-primary" on:click={addMokwon}>
						<i class="fa-solid fa-plus"></i> 추가
					</button>
				</div>
				<div class="overflow-y-auto h-100 list-group common-scroll">
					{#if mokwonList.length === 0}
						<div class="my-5 d-flex-center flex-column">
							<img src="{imgSheep3}" alt="add mokwon">
							<h4 class="my-3 fw-bold">목원을 추가해 보아요.</h4>
						</div>
					{:else}
					{#each mokwonList as mokwon}
						<a
							href="#"
							class="mokwon-item list-group-item list-group-item-action list-item"
							on:click|preventDefault={e => {
								getMokwonInfo(mokwon.id);
							}}
						>
							<div>{mokwon.name}</div>
							<div>{mokwon.type}</div>
							<!-- <div>{mokwon.USER_INFO?.birthday ?? ""}</div>
							<div>{mokwon.USER_INFO?.phone ?? ""}</div> -->
						</a>
					{/each}
					{/if}
				</div>
			</section>
		</div>
	</div>
	<div class="mokwon-container-divider detail">
		<div class="mokwon-divider-body">
			<section>
				<MokwonInfo
					{mokja_id}
					bind:this={mokwonInfoComponent}
					on:message={refreshMokwonList}
				/>
			</section>
		</div>
	</div>
	<div class="mokwon-container-divider history">
		<div class="mokwon-divider-body">
			<MokwonHistoryList bind:this={mokwonHistoryListComponent} />
		</div>
	</div>
</div>

<style>
	.mokwon-container {
		display: flex;
		justify-content: center;
		align-items: flex-start;
		height: calc(100vh - 60px);
	}

	.mokwon-container-divider {
		padding: 1rem 0.5rem;
		height: 100%;
	}
	.mokwon-container-divider.list {
		width: 20%;
	}
	.mokwon-container-divider.detail {
		width: 30%;
	}
	.mokwon-container-divider.history {
		width: 50%;
	}

	.mokwon-divider-body {
		background-color: white;
		border: 1px solid lightgray;
		border-radius: 10px;
		height: 100%;
	}

	.mokwon-divider-body > section {
		padding: 0.5rem 1rem;
		height: 100%;
	}

	.mokwon-divider-body > section.mokwon-list-section {
		height: calc(100% - 40px);
	}

	.mokwon-item {
		display: flex;
		justify-content: space-between;
		padding: 0.25rem 0.5rem;
		cursor: pointer;
	}

	.mokwon-item > div:last-child {
		width: 25%;
	}
	.mokwon-item > div:first-child {
		width: 75%;
	}

	.mokwon-item:hover {
		background-color: #c9e2ee;
	}
</style>
