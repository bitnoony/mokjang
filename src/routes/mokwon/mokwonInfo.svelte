<script>
	export let selectedMokwonInfo;
	export let mokjaId;
	let mokwonInfo;
	$: mokwonInfo = getSelectedMokwonInfo(selectedMokwonInfo);

	function getSelectedMokwonInfo(mokwonInfo) {
		const info = mokwonInfo?.USER_INFO ?? "";
		return {
			name: mokwonInfo?.name ?? "",
			type: mokwonInfo?.type ?? "목원",
			birthday: info?.birthday ?? "",
			phone: info?.phone ?? "",
			job: info?.job ?? "",
			email: info?.email ?? "",
			partner: info?.partner ?? "",
			home_address: info?.home_address ?? "",
			job_address: info?.job_address ?? "",
			family: info?.family ?? "",
			training: info?.training ?? "",
			baptism: info?.baptism ?? "",
			enterance: info?.enterance ?? "",
		}
	}

	async function saveMokwon() {
		// validate

		// saveMokwon 고장.
		const data = {
			mokja_id: mokjaId,
			name: mokwonInfo.name, 
			type: mokwonInfo.type, 
			birthday: mokwonInfo.birthday, 
			phone: mokwonInfo.phone, 
			job: mokwonInfo.job, 
			email: mokwonInfo.email, 
			partner: mokwonInfo.partner, 
			home_address: mokwonInfo.home_address, 
			job_address: mokwonInfo.job_address, 
			family: mokwonInfo.family, 
			training: mokwonInfo.training, 
			baptism: mokwonInfo.baptism, 
			enterance: mokwonInfo.enterance
		}

		const response = await fetch('/api/mokwon', {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
</script>

<style>
	.mokwon-primary-info-row {
		display: flex;
		align-items: center;
		padding: 5px;
	}

	.primary-info-divide {
		padding: 5px;
	}

	.primary-info-divide.profile {
		width: 120px;
		border: 1px solid lightgray;
		border-radius: 4px;
		height: 150px;
	}

	.primary-info-divide:not(.profile) {
		width: calc(100% - 120px);
	}

	.primary-info-divide > div {
		padding: 5px 0;
	}

	.primary-info-divide > div:nth-child(1) {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.mokwon-name {
		width: calc(100% - 100px);
	}

	.input-group-text {
		width: 90px;
	}
</style>

<div>
	<div class="mokwon-primary-info-row">
		<div class="primary-info-divide profile">프로필</div>
		<div class="primary-info-divide">
			<div>
				<div class="mokwon-name input-group">
					<span class="input-group-text">이름</span>
					<input type="text" class="form-control" placeholder="목원 이름" bind:value={mokwonInfo.name}>
					<select class="form-select" bind:value={mokwonInfo.type}>
						<option value="목자">목자</option>
						<option value="권찰">권찰</option>
						<option value="부목자">부목자</option>
						<option value="부권찰">부권찰</option>
						<option value="목원" selected>목원</option>
					</select>
				</div>
				<div class="mokwon-comment">
					<button class="btn btn-secondary">코멘트</button>
				</div>
			</div>
			<div class="d-flex justify-content-center align-items-center">
				<div class="input-group mx-1">
					<span class="input-group-text">생년월일</span>
					<input type="text" class="form-control" placeholder="생년월일" bind:value={mokwonInfo.birthday}>
				</div>
				<div class="input-group ms-1">
					<span class="input-group-text">전화번호</span>
					<input type="text" class="form-control" placeholder="전화번호" bind:value={mokwonInfo.phone}>
				</div>
			</div>
			<div class="input-group mx-1">
				<span class="input-group-text">직업</span>
				<input type="text" class="form-control" placeholder="직업" bind:value={mokwonInfo.job}>
			</div>
		</div>
	</div>
	<div class="my-2">
		<div class="d-flex justify-content-center align-items-center">
			<div class="input-group me-1">
				<span class="input-group-text">이메일</span>
				<input type="email" class="form-control" placeholder="이메일" bind:value={mokwonInfo.email}>
			</div>
			<div class="input-group ms-1">
				<span class="input-group-text">배우자</span>
				<input type="text" class="form-control" placeholder="배우자" bind:value={mokwonInfo.partner}>
			</div>
		</div>
	</div>
	<div class="my-2">
		<div class="input-group">
			<span class="input-group-text">주소</span>
			<input type="text" class="form-control" placeholder="주소" bind:value={mokwonInfo.home_address}>
		</div>
	</div>
	<div class="my-2">
		<div class="input-group">
			<span class="input-group-text">직장주소</span>
			<input type="text" class="form-control" placeholder="직장주소" bind:value={mokwonInfo.job_address}>
		</div>
	</div>
	<div class="my-2">
		<div class="input-group">
			<span class="input-group-text">가족관계</span>
			<input type="text" class="form-control" placeholder="가족관계" bind:value={mokwonInfo.family}>
		</div>
	</div>
	<div class="mt-4 mb-2">
		<div class="input-group">
			<span class="input-group-text">최종양육</span>
			<select class="form-select" bind:value={mokwonInfo.training}>
				<option value="">없음</option>
				<option value="새신자교육">새신자교육</option>
				<option value="think양육">think양육</option>
				<option value="양육교사">양육교사</option>
				<option value="예비목자1">예비목자1</option>
				<option value="예비목자2">예비목자2</option>
			</select>
		</div>
	</div>
	<div>
		<div class="d-flex justify-content-center align-items-center">
			<div class="input-group me-1">
				<span class="input-group-text">세례년도</span>
				<input type="text" class="form-control" placeholder="세례년도" bind:value={mokwonInfo.baptism}>
			</div>
			<div class="input-group ms-1">
				<span class="input-group-text">입교년도</span>
				<input type="text" class="form-control" placeholder="입교년도" bind:value={mokwonInfo.enterance}>
			</div>
		</div>
	</div>
	<div>
		<div class="my-3">히스토리</div>
	</div>
	<div>
		<button class="btn btn-lg btn-success" on:click={saveMokwon}>저장</button>
		<button class="btn btn-lg btn-danger">삭제</button>
		<button class="btn btn-lg btn-secondary">취소</button>
	</div>
</div>