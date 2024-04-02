<script>
	import { supabase, getUser } from "$lib/supabaseClient";
	import MokwonInfo from "../../mokwon/mokwonInfo.svelte";
	import MokwonHistoryList from "../../mokwon/MokwonHistoryList.svelte";
	import Memo from "./Memo.svelte";
	import { getMokwonListInMokjang } from "../../mokwon/mokwon.js";
	import title from '$lib/utils/LayoutTitle';
	export let data;
	let { meeting, userId, mokjangIdx, mokjang_name } = data;
	let { idx: meetingIdx, meeting_title, meeting_date, place, memo } = meeting;
	let mokwonInfoComponent;
	let mokwonHistoryListComponent;
	let mokwonList = [];
	let participantList = [];
	$: mokwonList;
	$: participantList;
	$title = `${mokjang_name} | ${meeting_title}`;

	init();
	
	async function init() {
		await getList();
		await selectMokja();
	}

	// 초기 목자 선택
	async function selectMokja() {
		const user = await getUser();
		if (mokwonList.length > 0 && user) {
			const filteredList = mokwonList.filter(u => u.id === user.id);
			if (filteredList.length === 0) return;

			const me = filteredList[0];
			selectParticipant(null, me.id);
		}
	}

	async function getList() {
		const data = await getMokwonListInMokjang(userId, mokjangIdx);
		mokwonList = data.mokwonList;
		await getParticipantList();

		mokwonList = mokwonList.map(m => {
			const participant = participantList.find(p => p.user_id === m.id);
			const isparticipant = participant ? true : false;
			const groupIdx = participant?.groupIdx ?? "";

			return {
				...m,
				isparticipant,
				groupIdx,
			};
		});
	}

	async function getParticipantList() {
		let { data } = await supabase
			.from("MEETING_GROUP")
			.select("*, USERS (id, name, profile_image), MEMO (content, comment)")
			.eq("meeting_idx", meetingIdx);

		participantList = data.map(p => {
			return {
				groupIdx: p.group_idx,
				user_id: p.USERS.id,
				name: p.USERS.name,
				profile_image: p.USERS.profile_image,
				memo: p.MEMO[0]?.content ?? "",
				comment: p.MEMO[0]?.comment ?? "",
			};
		});
	}

	async function makeAttendance(e, mokwonId, groupIdx) {
		const checked = e.target.checked;
		let result;
		try {
			const user = await getUser();
			if (checked) {
				// 체크했을때, 추가
				result = await fetch("/api/meeting/participant", {
					method: "POST",
					body: JSON.stringify({
						meeting_idx: meetingIdx,
						id: mokwonId,
						writer_id: user?.id,
					}),
					headers: {
						"Content-Type": "application/json",
					},
				});
			} else if (
				confirm("정말로 출석을 취소 하시겠습니까?\n메모가 사라집니다.")
			) {
				result = await fetch("/api/meeting/participant", {
					method: "DELETE",
					body: JSON.stringify({ group_idx: groupIdx }),
					headers: { "Content-Type": "application/json" },
				});
			} else {
				e.target.checked = !checked;
				return;
			}

			if (!result.ok) throw "실패";
		} catch (e) {
			alert("출석 중 문제가 발생했습니다.");
			console.error(e);
		}

		// 리프레시
		getList();
	}

	async function updateMeeting(e) {
		const columnName = e.target.name;
		const value = e.target.value;

		const { data, error } = await supabase
			.from("MEETING")
			.update({ [columnName]: value, modified_date: new Date().toISOString() })
			.eq("idx", meetingIdx)
			.select();

		if (error) {
			alert("수정중 문제가 발생했습니다.");
			console.error(error);
		}
	}

	function selectParticipant(e, mokwonId) {
		mokwonInfoComponent.getMokwonInfo(mokwonId);
		mokwonHistoryListComponent.getMokwonHistory(mokwonId);
	}
</script>

<svelte:head>
	<title>{mokjang_name} | {meeting_title}</title>
</svelte:head>

<section class="meeting-section">
	<div class="meeting-container">
		<div class="meeting-info-wrap">
			<div class="meeting-info-group">
				<div class="meeting-name d-flex">
					<div class="w-50 pe-1 d-flex input-group">
						<span class="input-group-text">모임이름</span>
						<input
							name="meeting_title"
							type="text"
							class="form-control"
							placeholder="모임 이름을 적어주세요."
							bind:value={meeting_title}
							on:change={updateMeeting}
						/>
					</div>
					<div class="w-50 ps-1 d-flex">
						<div>목원 수: {participantList.length}</div>
					</div>
				</div>
				<div class="meeting-info">
					<div class="d-flex mb-2">
						<div class="input-group pe-1">
							<span class="input-group-text">날짜</span>
							<input
								name="meeting_date"
								type="date"
								class="form-control"
								placeholder="날짜를 입력해 주세요."
								bind:value={meeting_date}
								on:change={updateMeeting}
							/>
						</div>
						<div class="input-group ps-1">
							<span class="input-group-text">장소</span>
							<select
								name="place"
								class="form-select"
								bind:value={place}
								on:change={updateMeeting}
							>
								{#each participantList as { name }}
									<option value={name}>{name}</option>
								{/each}
							</select>
						</div>
					</div>
					<div>
						<textarea
							name="memo"
							cols="30"
							rows="2"
							class="form-control meeting-comment"
							placeholder="코멘트를 입력해 주세요."
							on:change={updateMeeting}
							bind:value={memo}
						></textarea>
					</div>
				</div>
			</div>
			<div class="meeting-list-group">
				<div class="mokwon-list">
					<div class="list-group overflow-y-auto h-100 common-scroll">
						{#each mokwonList as mokwon}
							<button
								class="py-1 px-3 list-group-item list-group-item-action list-item d-flex align-items-center"
								aria-current="true"
								on:click={e => selectParticipant(e, mokwon.id)}
							>
								<div class="d-flex gap-2 w-100 justify-content-between">
									<div>
										<p class="mb-1">
											{mokwon.name}
											<span
												class="align-bottom badge text-bg-{mokwon.type ===
												'목자'
													? 'danger'
													: 'success'}"
											>
												{mokwon.type}
											</span>
										</p>
									</div>
								</div>
								<div
									class="d-flex justify-content-end w-25 form-check form-switch"
								>
									<input
										class="form-check-input"
										type="checkbox"
										role="switch"
										bind:checked={mokwon.isparticipant}
										on:click|stopPropagation={e => {
											makeAttendance(e, mokwon.id, mokwon.groupIdx);
										}}
									/>
								</div>
							</button>
						{/each}
					</div>
				</div>
			</div>
		</div>
		<div class="memo-info-wrap common-scroll list-group">
			<!-- 이름순 -->
			{#each participantList as { user_id, groupIdx, name, profile_image, memo, comment }}
				<Memo 
					{groupIdx} 
					{name} 
					{memo} 
					{comment} 
					{profile_image} 
					on:message={() => selectParticipant(null, user_id)}
				/>
			{/each}
		</div>
	</div>
	<div class="mokwon-container">
		<nav>
			<div
				class="nav nav-tabs d-flex justify-content-between"
				id="nav-tab"
				role="tablist"
			>
				<button
					class="mokwon-tab nav-link active"
					id="tabMokwonInfo"
					data-bs-toggle="tab"
					data-bs-target="#tabMokwonInfoWrap"
					type="button"
					role="tab"
					aria-controls="tabMokwonInfoWrap"
					aria-selected="true"
				>
					목원정보
				</button>
				<button
					class="mokwon-tab nav-link"
					id="tabMokwonHistory"
					data-bs-toggle="tab"
					data-bs-target="#tabMokwonHistoryWrap"
					type="button"
					role="tab"
					aria-controls="tabMokwonHistoryWrap"
					aria-selected="false"
				>
					히스토리
				</button>
			</div>
		</nav>
		<div class="tab-content" id="nav-tabContent">
			<div
				class="h-100 tab-pane fade show active"
				id="tabMokwonInfoWrap"
				role="tabpanel"
				aria-labelledby="nav-home-tab"
				tabindex="0"
			>
				<div class="mokwon-info h-100">
					<MokwonInfo
						mokja_id={userId}
						bind:this={mokwonInfoComponent}
						on:message={getList}
					/>
				</div>
			</div>
			<div
				class="h-100 tab-pane fade"
				id="tabMokwonHistoryWrap"
				role="tabpanel"
				aria-labelledby="nav-profile-tab"
				tabindex="0"
			>
				<div class="h-100">
					<MokwonHistoryList bind:this={mokwonHistoryListComponent} />
				</div>
			</div>
		</div>
	</div>
</section>

<!-- <img src="{mokwon?.profile_image ?? userImg}" alt="twbs" width="32" height="32" class="rounded-circle flex-shrink-0 me-3"> -->

<!-- 
    <button class="btn btn-sm btn-primary" on:click|stopPropagation={() => {makeAttendance(mokwon.id)}}>
        <i class="fa fa-plus"></i>출석
    </button>
 -->

<style>
	@import "./page.css";
</style>
