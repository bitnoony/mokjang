<script>
	import "bootstrap/dist/css/bootstrap.css";
	import bootstrapBundle from "bootstrap/dist/js/bootstrap.bundle.js?url";
	import "@fortawesome/fontawesome-free/css/all.min.css";

	import { onMount } from 'svelte';
	import {goto} from '$app/navigation';

	export let data;
	let userForm;
	// $:email; // value에 넣기.

	async function formSubmit(event) {
		event.preventDefault(); // 아마도 막힘.

		const formData = {
			id: userForm.id.value,
			birthday: userForm.birthday.value,
			job: userForm.job.value,
			job_address: userForm.job_address.value,
			home_address: userForm.home_address.value,
			training: userForm.training.value,
			baptism: userForm.baptism.value,
			enterance: userForm.enterance.value,
			family: userForm.family.value,
			partner: userForm.partner.value,
			email: userForm.email.value,
			phone: userForm.phone.value,
			memo: userForm.memo.value,
		}

		const response = await fetch('/api/user-info', {
			method: 'POST',
			body: JSON.stringify(formData),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (response.ok) {
			goto('./mokjang/list');
		}
	}
</script>

<style>
	form {
		height: 100vh;
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

	.large-button {
		width: 200px;
		height: 75px;
		font-size: 20pt;
		font-weight: bold;
	}
</style>

<form action="/api/user-info" method="POST" bind:this={userForm} on:submit={formSubmit}>
	<div class="container card">
		<div class="d-flex justify-content-center my-5">
			<h1>목자 정보 입력</h1>
		</div>
		<div class="d-flex justify-content-between align-items-center">
			<div class="mx-2">
				<img src="{data.image}" alt="프로필 이미지" class="profile">
			</div>
			<div class="w-100">
				<div class="d-flex input-group my-2">
					<label class="input-group-text width-80">이름</label>
					<input type="text" name="name" value= "{data.name}" class="form-control">
				</div>
				<div class="d-flex input-group my-2">
					<label class="input-group-text width-80">생년월일</label>
					<input type="text" name="birthday" class="form-control">
				</div>
				<div class="d-flex input-group my-2">
					<label class="input-group-text width-80">이메일</label>
					<input type="text" name="email" class="form-control" value="{data.email}">
				</div>
				<div class="d-flex input-group my-2">
					<label class="input-group-text width-80">전화번호</label>
					<input type="text" name="phone" class="form-control">
				</div>
			</div>
		</div>
		<div class="d-flex input-group my-2">
			<label class="input-group-text width-80">직업</label>
			<input type="text" name="job" class="form-control">
		</div>
		<div class="d-flex input-group my-2">
			<label class="input-group-text width-80">직장주소</label>
			<input type="text" name="job_address" class="form-control">
		</div>
		<div class="d-flex input-group my-2">
			<label class="input-group-text width-80">집주소</label>
			<input type="text" name="home_address" class="form-control">
		</div>
		<div class="d-flex input-group my-2">
			<label class="input-group-text width-80">양육이름</label>
			<input type="text" name="training" class="form-control">
		</div>
		<div class="d-flex input-group my-2">
			<label class="input-group-text width-80">세례년도</label>
			<input type="text" name="baptism" class="form-control">
		</div>
		<div class="d-flex input-group my-2">
			<label class="input-group-text width-80">입교년도</label>
			<input type="text" name="enterance" class="form-control">
		</div>
		<div class="d-flex input-group my-2">
			<label class="input-group-text width-80">가족관계</label>
			<input type="text" name="family" class="form-control">
		</div>
		<div class="d-flex input-group my-2">
			<label class="input-group-text width-80">배우자</label>
			<input type="text" name="partner" class="form-control">
		</div>
		<div class="d-flex input-group my-2">
			<label class="input-group-text width-80">메모</label>
			<textarea name="memo" cols="30" rows="3" class="form-control"></textarea>
		</div>
		<div class="d-flex justify-content-center my-2">
			<input type="hidden" name="id" value="{data.id}">
			<button class="btn btn-success large-button" on:click={userForm.submit}>제 출</button>
		</div>
	<div>
</form>