<script>
	let name, type, birthday, phone, job, email, partner, home_address, job_address, family, training, baptism, enterance;

	async function saveMokwon() {
		// validate

		const data = {
			name, type, birthday, phone, job, 
			email, partner, home_address, job_address, family, 
			training, baptism, enterance
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
					<input type="text" class="form-control" placeholder="목원 이름" bind:value={name}>
					<select class="form-select" bind:value={type}>
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
					<input type="text" class="form-control" placeholder="생년월일" bind:value={birthday}>
				</div>
				<div class="input-group ms-1">
					<span class="input-group-text">전화번호</span>
					<input type="text" class="form-control" placeholder="전화번호" bind:value={phone}>
				</div>
			</div>
			<div class="input-group mx-1">
				<span class="input-group-text">직업</span>
				<input type="text" class="form-control" placeholder="직업" bind:value={job}>
			</div>
		</div>
	</div>
	<div class="my-2">
		<div class="d-flex justify-content-center align-items-center">
			<div class="input-group me-1">
				<span class="input-group-text">이메일</span>
				<input type="email" class="form-control" placeholder="이메일" bind:value={email}>
			</div>
			<div class="input-group ms-1">
				<span class="input-group-text">배우자</span>
				<input type="text" class="form-control" placeholder="배우자" bind:value={partner}>
			</div>
		</div>
	</div>
	<div class="my-2">
		<div class="input-group">
			<span class="input-group-text">주소</span>
			<input type="text" class="form-control" placeholder="주소" bind:value={home_address}>
		</div>
	</div>
	<div class="my-2">
		<div class="input-group">
			<span class="input-group-text">직장주소</span>
			<input type="text" class="form-control" placeholder="직장주소" bind:value={job_address}>
		</div>
	</div>
	<div class="my-2">
		<div class="input-group">
			<span class="input-group-text">가족관계</span>
			<input type="text" class="form-control" placeholder="가족관계" bind:value={family}>
		</div>
	</div>
	<div class="mt-4 mb-2">
		<div class="input-group">
			<span class="input-group-text">최종양육</span>
			<select class="form-select" bind:value={training}>
				<option selected>선택하세요...</option>
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
				<input type="text" class="form-control" placeholder="세례년도" bind:value={baptism}>
			</div>
			<div class="input-group ms-1">
				<span class="input-group-text">입교년도</span>
				<input type="text" class="form-control" placeholder="입교년도" bind:value={enterance}>
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