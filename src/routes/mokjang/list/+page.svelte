<script>
	import imgPlzAddMokjang from '$lib/assets/plz_add_mokjang_300.png';
	import { goto } from "$app/navigation";

	export let data;
	const { mokjangList, userId } = data;

	let modal;
	let mokjangModalType;
	let modalIdx, modalMokjangName, modalArea, modalTag, modalCurrentUse;

	function gotoMokjang(mokjangIdx) {
		goto(`./${mokjangIdx}`);
	}

	/**
	 * 목장 추가 모달 오픈
	 */
	function addMokjang(e) {
		mokjangModalType = "추가";
		modal.classList.remove("d-none"); // 모달을 연다.
	}

	/**
	 * 모달 닫기
	 */
	function modalClose() {
		modalMokjangName = "";
		modalArea = "";
		modalTag = "";
		modal.classList.add("d-none");
	}

	/**
	 * 목장 수정 모달 오픈
	 * @param name 목장 이름
	 * @param area 지역
	 * @param tag 태그
	 */
	function modifyMokjang(e, mokjang) {
		const { idx, mokjang_name, area, tag, current_use } = mokjang;
		modalIdx = idx;
		modalMokjangName = mokjang_name;
		modalArea = area;
		modalTag = tag;
		modalCurrentUse.checked = current_use;
		mokjangModalType = "수정";
		modal.classList.remove("d-none"); // 모달을 연다.
	}

	/**
	 * 모달 데이터 전송
	 */
	async function modalSubmit(e) {
		if (!modalMokjangName) {
			alert("목장 이름이 없습니다!");
			return;
		}

		if (!userId) {
			alert("유저 정보가 없습니다. 다시 로그인해 주세요.");
			goto("/");
		}

		let data = {
			mokjang_name: modalMokjangName,
			area: modalArea,
			tag: modalTag,
			current_use: modalCurrentUse.checked,
			user_id: userId,
		};

		if (mokjangModalType !== "추가") {
			data.idx = modalIdx;
		}

		const response = await fetch("/api/mokjang", {
			method: mokjangModalType === "추가" ? "POST" : "PUT",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (response.ok) {
			modalClose();
			setTimeout(() => {
				alert(`성공적으로 ${mokjangModalType} 되었습니다.`);
				goto('/mokjang/list');
			}, 10);
		}
	}

	/**
	 * 목장 삭제
	 */
	async function deleteMokjang(e, idx) {
		if (!confirm(`목장: ${modalMokjangName}\n정말로 삭제하시겠습니까?`)) return;

		if (!idx) {
			alert("목장 데이터가 유효하지 않습니다.\n관리자에게 문의하세요.");
			return;
		}

		if (!userId) {
			alert("유저 정보가 없습니다. 다시 로그인해 주세요.");
			goto("/");
		}

		const data = {
			idx,
			user_id: userId,
		};

		const response = await fetch("/api/mokjang", {
			method: "DELETE",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (response.ok) {
			modalClose();
			setTimeout(() => {
				alert(`성공적으로 삭제 되었습니다.`);
				location.reload();
			}, 10);
		}
	}
</script>

<svelte:head>
	<title>목장목록 :: 목장 MOKJANG</title>
</svelte:head>

<section class="mokjang-list-container">
	<div class="mokjang-list-wrap container">
		<div class="mokjang-nav">
			<button class="me-1 btn btn-primary" on:click={addMokjang}>
				<i class="fa-solid fa-plus"></i>
				목장 추가
			</button>
		</div>
		{#if mokjangList.length === 0}
			<div class="my-5 d-flex-center flex-column">
				<h3 class="my-3 fw-bold">목장이 없어요.</h3>
				<img src="{imgPlzAddMokjang}" alt="plz_add_mokjang">
			</div>
		{:else}
		{#each mokjangList as _, i}
			{#if i % 4 === 0}
				<div class="row">
					{#each [...mokjangList].splice(i, 4) as mokjang, index (index)}
						<div
							data-idx={mokjang.idx}
							class="p-2 col-lg-3 col-md-6 col-sm-12"
							on:click={() => gotoMokjang(mokjang.idx)}
						>
							<div class="card">
								<div class="card-body">
									<div class="d-flex justify-content-between align-items-center">
										<h5>
											{#if mokjang.current_use}
												<i class="fa-solid fa-house"></i>
											{/if}
											{mokjang.mokjang_name}
										</h5>
										<button
											data-idx={mokjang.idx}
											class="btn-gear no-decorations-btn"
											on:click|stopPropagation={e => modifyMokjang(e, mokjang)}
										>
											<i class="fa-solid fa-gear"></i>
										</button>
									</div>
									<h6 class="card-subtitle mb-2 text-body-secondary">
										{mokjang.area}
									</h6>
									<h6 class="card-subtitle mb-2 text-body-secondary">
										{mokjang.tag ?? ""}
									</h6>
								</div>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		{/each}
		{/if}
	</div>
	<!-- 모달 -->
	<div class="modal-center d-none" bind:this={modal}>
		<div class="modal-content rounded-4 shadow bg-white">
			<div class="modal-header p-3 pb-2 border-bottom-0">
				<h1 class="fw-bold mb-0 fs-4">목장 {mokjangModalType}</h1>
				<button type="button" class="btn-close py-2 fs-4" on:click={modalClose}
				></button>
			</div>

			<div class="modal-body p-3 pt-0">
				<div class="form-floating mb-3">
					<input
						type="text"
						class="form-control rounded-3"
						id="floatingMokjang"
						bind:value={modalMokjangName}
					/>
					<label for="floatingMokjang">목장 이름</label>
				</div>
				<div class="form-floating mb-3">
					<input
						type="text"
						class="form-control rounded-3"
						id="floatingArea"
						bind:value={modalArea}
					/>
					<label for="floatingArea">지역</label>
				</div>
				<div class="form-floating mb-3">
					<input
						type="text"
						class="form-control rounded-3"
						id="floatingTag"
						bind:value={modalTag}
					/>
					<label for="floatingTag">태그</label>
				</div>
				<div class="mb-3 d-flex justify-content-center">
					<div class="form-check form-switch">
						<label class="form-check-label" for="currentMokjangToggle"
							>현재 목장 여부</label
						>
						<input
							class="form-check-input"
							type="checkbox"
							role="switch"
							id="currentMokjangToggle"
							bind:this={modalCurrentUse}
						/>
					</div>
				</div>
				<button
					class="w-100 mb-2 btn btn-lg rounded-3 btn-primary"
					on:click|once={modalSubmit}>확인</button
				>
				{#if mokjangModalType !== "추가"}
					<hr class="my-4" />
					<div class="d-flex justify-content-end">
						<button
							class="mb-2 btn btn-sm rounded-3 btn-danger"
							on:click={e => deleteMokjang(e, modalIdx)}
						>
							<i class="fa-solid fa-trash"></i>
							목장 삭제
						</button>
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>

<style>
	.mokjang-list-container {
		padding: 1rem 2rem 0 2rem;
		height: calc(100vh - 60px);
		overflow-x: hidden;
	}

	.mokjang-list-wrap {
		padding: 1rem 2rem 0 2rem;
		height: 100%;
	}

	.mokjang-nav {
		margin-bottom: 10px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.card {
		height: 150px;
		cursor: pointer;
		box-shadow: 0 0 10px 0 #0001;
	}

	.card:hover {
		background-color: white;
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

	.modal-center {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #000a;
	}

	.modal-center > div {
		width: 500px;
	}

	.no-decorations-btn {
		border: 0;
		background-color: transparent;
	}
</style>
