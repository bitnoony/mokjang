<script>
	import title from '$lib/utils/LayoutTitle';
	$title = "목자 정보";
	export let data;
	let userForm;

	async function formSubmit(event) {
		event.preventDefault();

		const formData = {
			id: userForm.id.value,
			name: userForm.name.value,
			birthday: userForm.birthday.value,
			job: userForm.job.value,
			job_address: userForm.job_address.value,
			home_address: userForm.home_address.value,
			training: userForm.training.value,
			baptism: userForm.baptism.value,
			entrance: userForm.entrance.value,
			family: userForm.family.value,
			partner: userForm.partner.value,
			email: userForm.email.value,
			phone: userForm.phone.value,
			memo: userForm.memo.value,
		};

		const response = await fetch("/api/user-info", {
			method: "POST",
			body: JSON.stringify(formData),
			headers: {
				"Content-Type": "application/json",
			},
		});

		const isSuccess = await response.json();

		if (response.ok && isSuccess) {
			alert("적용 되었습니다.");
		} else {
			alert("에러가 발생했습니다. 관리자에게 문의하세요.");
		}
	}
</script>

<svelte:head>
	<title>목자정보 :: 목장 MOKJANG</title>
</svelte:head>

<form
	action="/api/user-info"
	method="POST"
	bind:this={userForm}
	on:submit={formSubmit}
>
	<div class="mokja-container">
		<div class="d-flex justify-content-between align-items-center">
			<div class="mx-2">
				<img src={data.profile_image} alt="프로필 이미지" class="profile" />
			</div>
			<div class="w-100">
				<div class="d-flex input-group my-2">
					<label for="name" class="input-group-text width-80">이름</label>
					<input
						type="text"
						name="name"
						value={data.name}
						class="form-control"
					/>
				</div>
				<div class="d-flex input-group my-2">
					<label for="birthday" class="input-group-text width-80">생년월일</label>
					<input type="text" name="birthday" class="form-control" value={data.USER_INFO.birthday}/>
				</div>
				<div class="d-flex input-group my-2">
					<label for="email" class="input-group-text width-80">이메일</label>
					<input
						type="text"
						name="email"
						class="form-control"
						value={data.USER_INFO.email}
					/>
				</div>
				<div class="d-flex input-group my-2">
					<label for="phone" class="input-group-text width-80">전화번호</label>
					<input type="text" name="phone" class="form-control" value={data.USER_INFO.phone}/>
				</div>
			</div>
		</div>
		<div class="d-flex input-group my-2">
			<label for="job" class="input-group-text width-80">직업</label>
			<input type="text" name="job" class="form-control" value={data.USER_INFO.job}/>
		</div>
		<div class="d-flex input-group my-2">
			<label for="job_address" class="input-group-text width-80">직장주소</label>
			<input type="text" name="job_address" class="form-control" value={data.USER_INFO.job_address}/>
		</div>
		<div class="d-flex input-group my-2">
			<label for="home_address" class="input-group-text width-80">집주소</label>
			<input type="text" name="home_address" class="form-control" value={data.USER_INFO.home_address}/>
		</div>
		<div class="d-flex input-group my-2">
			<label for="training" class="input-group-text width-80">양육이름</label>
			<input type="text" name="training" class="form-control" value={data.USER_INFO.training}/>
		</div>
		<div class="d-flex input-group my-2">
			<label for="baptism" class="input-group-text width-80">세례년도</label>
			<input type="text" name="baptism" class="form-control" value={data.USER_INFO.baptism}/>
		</div>
		<div class="d-flex input-group my-2">
			<label for="entrance" class="input-group-text width-80">입교년도</label>
			<input type="text" name="entrance" class="form-control" value={data.USER_INFO.entrance}/>
		</div>
		<div class="d-flex input-group my-2">
			<label for="family" class="input-group-text width-80">가족관계</label>
			<input type="text" name="family" class="form-control" value={data.USER_INFO.family}/>
		</div>
		<div class="d-flex input-group my-2">
			<label for="partner" class="input-group-text width-80">배우자</label>
			<input type="text" name="partner" class="form-control" value={data.USER_INFO.partner}/>
		</div>
		<div class="d-flex input-group my-2">
			<label for="memo" class="input-group-text width-80">메모</label>
			<textarea name="memo" cols="30" rows="3" class="form-control" value={data.USER_INFO.memo}></textarea>
		</div>
		<div class="d-flex justify-content-center my-2">
			<input type="hidden" name="id" value={data.id} />
			<button class="btn btn-lg btn-success" on:submit={userForm.submit}>
				<i class="fa-solid fa-floppy-disk"></i> 저장
			</button>
		</div>
		<div></div>
	</div>
</form>

<style>
	.mokja-container {
		background-color: white;
		padding: 1rem;
		border: 1px solid lightgray;
		border-radius: 10px;
		box-shadow: 0 0 10px 0 #0001;
		width: 600px;
		margin: 2rem auto 0 auto;
	}

	form {
		height: 100%;
		display: flex;
		align-items: center;
	}

	.profile {
		width: 150px;
	}

	.width-80 {
		width: 80px;
		display: flex;
		justify-content: center;
	}
</style>
