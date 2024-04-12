<script>
	import imgDefaultProfile from "$lib/assets/empty_profile.png";
	import { createEventDispatcher } from "svelte";
	import imageCompression from 'browser-image-compression';
	import { toasts }  from "svelte-toasts";
	import Toast from "$lib/components/toast/toast.svelte";
	import { supabase } from '$lib/supabaseClient.js';
	const dispatch = createEventDispatcher();

	export let mokja_id;
	let mokwonInfo;
	let uploadImage;
	let profile;
	$: mokwonInfo = setMokwonInfo();

	function setMokwonInfo(mokwonInfo = null) {
		const info = mokwonInfo?.USER_INFO ?? "";

		// 프로필 이미지
		let profileImage = "";
		if (mokwonInfo?.id) {
			profileImage = mokwonInfo?.profile_image ?? imgDefaultProfile;
		} else {
			profileImage = "";
		}

		return {
			id: mokwonInfo?.id ?? "",
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
			entrance: info?.entrance ?? "",
			memo: info?.memo ?? "",
			profile_image: profileImage,
			uploadFile: ""
		};
	}

	export async function getMokwonInfo(mokwonId) {
		if (mokwonId) {
			const response = await fetch(`/api/mokwon?id=${mokwonId}`);
			const responseData = await response.json();
			mokwonInfo = setMokwonInfo({
				id: mokwonId,
				...responseData.mokwonInfo.data,
			});
		} else {
			mokwonInfo = setMokwonInfo();
		}
	}

	async function saveMokwon() {
		// validate
		if (!mokwonInfo.name) {
			toasts.add({ type: 'warning', description: '이름은 필수입니다.',});
			return;
		}

		const data = {
			mokja_id: mokja_id,
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
			entrance: mokwonInfo.entrance,
			memo: mokwonInfo.memo,
		};

		const response = await fetch("/api/mokwon", {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		});

		const {userId, isSuccess} = await response.json();
		let profileImage;
		if (mokwonInfo.uploadFile) {
			profileImage = await uploadToServer (mokwonInfo.uploadFile, userId);
			await supabase.from('USERS')
			.update({ profile_image: profileImage ?? "" })
			.eq('id', userId);
		}

		if (isSuccess) {
			dispatch("message");
			mokwonInfo = getMokwonInfo(userId);
			toasts.add({ type: 'success', description: '목원이 추가 되었습니다.',});
		}
	}

	async function modifyMokwon() {
		// validate
		if (!mokwonInfo.name) {
			toasts.add({ type: 'warning', description: '이름은 필수입니다.',});
			return;
		}
		
		let profileImage;
		if (mokwonInfo.uploadFile) {
			profileImage = await uploadToServer (mokwonInfo.uploadFile);
		}

		const data = {
			id: mokwonInfo.id,
			mokja_id: mokja_id,
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
			entrance: mokwonInfo.entrance,
			memo: mokwonInfo.memo,
			profile_image: profileImage ?? mokwonInfo.profile_image
		};

		const response = await fetch("/api/mokwon", {
			method: "PUT",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		});

		const { isSuccess } = await response.json();

		if (isSuccess) {
			dispatch("message");
			mokwonInfo = getMokwonInfo(mokwonInfo.id);
			toasts.add({ type: 'success', description: '수정 되었습니다.',});
		}
	}

	async function deleteMokwon() {
		const id = mokwonInfo.id;

		if (!confirm(`정말로 ${mokwonInfo.name}을(를) 삭제하시겠습니까?`)) return;

		const response = await fetch(`/api/mokwon?id=${id}`, {
			method: "DELETE",
		});

		const { isSuccess } = await response.json();

		if (isSuccess) {
			dispatch("message");
			mokwonInfo = getMokwonInfo();
			toasts.add({ type: 'success', description: '삭제 되었습니다.',});
		}
	}

	function clickFile(e) {
		uploadImage.value = "";
		uploadImage.click();
	}

	async function handleImageCompression(e) {
		const imageFile = e.target.files[0];
		// console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
		// console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

		const options = {
			maxSizeMB: 1,
			maxWidthOrHeight: 1920,
			useWebWorker: true,
		}

		try {
			toasts.add({ type: 'info', description: '파일을 압축중입니다. 잠시만 기다려주세요.',});
			mokwonInfo.uploadFile = await imageCompression(imageFile, options);

			const reader = new FileReader();
			reader.readAsDataURL(mokwonInfo.uploadFile);
			reader.onload = function () {
				mokwonInfo.profile_image = reader.result;
			};
			reader.onerror = function (error) {
				console.log('Error: ', error);
			};
			// console.log('uploadFile instanceof Blob', uploadFile instanceof Blob); // true
			// console.log(`uploadFile size ${uploadFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
		} catch (error) {
			alert("파일 압축 중 문제가 발생했습니다.\n관리자에게 문의하세요.");
			console.error(error);
		}
	}

	/**
	 * 수파베이스에 파일을 업로드 한 후, path를 반환합니다.
	 * @param file blob file for upload
	 */
	async function uploadToServer(file, id) {
		const mokwonId = (id ?? mokwonInfo?.id);

		if (!mokja_id || !mokwonId) {
			console.error("mokja_id: ", mokja_id, "mokwon_id: ", mokwonId);
			throw "no mokja_id or mokwon_id";
		}
		
		// 버킷을 검색합니다.
		try {
			const fileName = `${mokwonId}.${(file.name).split(".")[1]}`;
			const { data: {path}, error } = await supabase
			.storage
			.from('mokwon_profile')
			.upload(`${mokja_id}/${fileName}`, file, {
				cacheControl: '3600',
				upsert: true
			});
			
			if (!path) throw "no path";

			
			const { data: {publicUrl} } = supabase
				.storage
				.from('mokwon_profile')
				.getPublicUrl(path)

			return `${publicUrl}?v=${Date.now()}`;
		} catch (error) {
			alert("업로드 중 문제가 발생했습니다. 관리자에게 문의하세요.")
			console.error(error);
		}
	}
</script>

<div class="h-100">
	<div>
		{#if mokwonInfo.id === ""}
			<button class="btn btn-sm btn-lg btn-success" on:click={saveMokwon}>
				<i class="fa-solid fa-floppy-disk"></i> 저장
			</button>
		{:else}
			<button class="btn btn-sm btn-lg btn-success" on:click={modifyMokwon}>
				<i class="fa-solid fa-edit"></i> 수정
			</button>
			<button
				class="btn btn-sm btn-lg btn-danger"
				on:click={deleteMokwon}
				disabled={mokwonInfo.id === ""}
			>
				<i class="fa-solid fa-trash"></i> 삭제
			</button>
		{/if}
	</div>
	<div class="mokwon-primary-info-row">
		<button
			class="primary-info-divide profile bg-white"
			style="background-image: url('{mokwonInfo.profile_image}');"
			bind:this={profile}
			on:click={clickFile}
		></button>
		<input type="file" bind:this={uploadImage} hidden on:change={handleImageCompression} />
		<div class="primary-info-divide">
			<div>
				<div class="mokwon-name input-group input-group-sm">
					<span class="input-group-text">이름</span>
					<input
						type="text"
						class="form-control"
						placeholder="목원 이름"
						bind:value={mokwonInfo.name}
						style="width:143px;"
					/>
					<select class="form-select" bind:value={mokwonInfo.type} style="">
						<option value="목자">목자</option>
						<option value="권찰">권찰</option>
						<option value="부목자">부목자</option>
						<option value="부권찰">부권찰</option>
						<option value="목원" selected>목원</option>
					</select>
				</div>
			</div>
			<div class="d-flex justify-content-center align-items-center">
				<div class="input-group input-group-sm mx-1">
					<span class="input-group-text">생년월일</span>
					<input
						type="text"
						class="form-control"
						placeholder="생년월일"
						bind:value={mokwonInfo.birthday}
					/>
				</div>
				<div class="input-group input-group-sm ms-1">
					<span class="input-group-text">전화번호</span>
					<input
						type="text"
						class="form-control"
						placeholder="전화번호"
						bind:value={mokwonInfo.phone}
					/>
				</div>
			</div>
			<div class="input-group input-group-sm mx-1">
				<span class="input-group-text">직업</span>
				<input
					type="text"
					class="form-control"
					placeholder="직업"
					bind:value={mokwonInfo.job}
				/>
			</div>
		</div>
	</div>
	<div class="my-2">
		<div class="d-flex justify-content-center align-items-center">
			<div class="input-group input-group-sm me-1">
				<span class="input-group-text">이메일</span>
				<input
					type="email"
					class="form-control"
					placeholder="이메일"
					bind:value={mokwonInfo.email}
				/>
			</div>
			<div class="input-group input-group-sm ms-1">
				<span class="input-group-text">배우자</span>
				<input
					type="text"
					class="form-control"
					placeholder="배우자"
					bind:value={mokwonInfo.partner}
				/>
			</div>
		</div>
	</div>
	<div class="my-2">
		<div class="input-group input-group-sm">
			<span class="input-group-text">주소</span>
			<input
				type="text"
				class="form-control"
				placeholder="주소"
				bind:value={mokwonInfo.home_address}
			/>
		</div>
	</div>
	<div class="my-2">
		<div class="input-group input-group-sm">
			<span class="input-group-text">직장주소</span>
			<input
				type="text"
				class="form-control"
				placeholder="직장주소"
				bind:value={mokwonInfo.job_address}
			/>
		</div>
	</div>
	<div class="my-2">
		<div class="input-group input-group-sm">
			<span class="input-group-text">가족관계</span>
			<input
				type="text"
				class="form-control"
				placeholder="가족관계"
				bind:value={mokwonInfo.family}
			/>
		</div>
	</div>
	<div class="mt-4 mb-2">
		<div class="input-group input-group-sm">
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
	<div class="my-2">
		<div class="d-flex justify-content-center align-items-center">
			<div class="input-group input-group-sm me-1">
				<span class="input-group-text">세례년도</span>
				<input
					type="text"
					class="form-control"
					placeholder="세례년도"
					bind:value={mokwonInfo.baptism}
				/>
			</div>
			<div class="input-group input-group-sm ms-1">
				<span class="input-group-text">입교년도</span>
				<input
					type="text"
					class="form-control"
					placeholder="입교년도"
					bind:value={mokwonInfo.entrance}
				/>
			</div>
		</div>
	</div>
	<div style="height: calc(100% - 430px);">
		<textarea
			cols="30"
			rows="10"
			class="form-control h-100"
			placeholder="목원 메모"
			bind:value={mokwonInfo.memo}
		></textarea>
	</div>
</div>
<Toast />

<style>
	.mokwon-primary-info-row {
		display: flex;
		padding: 0 5px;
	}

	.primary-info-divide {
		padding: 5px;
	}

	.primary-info-divide.profile {
		width: 90px;
		border: 1px solid lightgray;
		border-radius: 4px;
		height: 114px;
		margin-top: 10px;
		background-position: center;
		background-repeat: no-repeat;
		background-size: contain;
	}

	.primary-info-divide:not(.profile) {
		width: calc(100% - 90px);
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
		width: 100%;
	}

	.input-group-text {
		width: 75px;
	}
</style>
