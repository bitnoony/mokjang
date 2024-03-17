import { supabase } from "$lib/supabaseClient";
import { json } from "@sveltejs/kit";

// export async function GET({ request }) {
// }

/**
 * 목장 생성
 */
export async function POST({ request }) {
	const requestData = await request.json();
	const { mokjang_name, user_id, current_use } = requestData;
	let result = false;

	// data 유효성 검사
	if (!mokjang_name || !user_id) {
		const resp = {
			isSuccess: result,
			error_message: "정보가 누락 되었습니다.",
		};
		return json(resp);
	}

	// supabase 데이터 저장.
	try {
		await disableCurrentUse(current_use, user_id);

		await supabase.from("MOKJANG").insert(requestData);
	} catch (err) {
		const errorMsg = "목장 생성 중 에러가 발생했습니다.";
		console.error(err, errorMsg);
		const resp = {
			isSuccess: result,
			error_message: errorMsg,
		};
		return json(resp);
	}

	result = true;
	return json({ isSuccess: result });
}

/**
 * 목장 수정
 * @param {*} request 서버 request data 입니다.
 * @returns 성공하면 isSuccess = true
 */
export async function PUT({ request }) {
	const requestData = await request.json();
	const { idx, mokjang_name, area, tag, user_id, current_use } = requestData;
	let result = false;

	// data 유효성 검사
	if (!idx || !mokjang_name || !user_id) {
		const resp = {
			isSuccess: result,
			error_message: "정보가 누락 되었습니다.",
		};
		return json(resp);
	}

	// supabase 데이터 수정.
	try {
		await disableCurrentUse(current_use, user_id);

		await supabase
			.from("MOKJANG")
			.update({
				mokjang_name,
				area,
				tag,
				current_use,
			})
			.eq("idx", idx);
	} catch (err) {
		const errorMsg = "목장 수정 중 에러가 발생했습니다.";
		console.error(err, errorMsg);
		const resp = {
			isSuccess: result,
			error_message: errorMsg,
		};
		return json(resp);
	}

	result = true;
	return json({ isSuccess: result });
}

/**
 * # 목장 삭제
 * - 이것은 목장을 삭제하는 기능입니다.
 * - 유저 아이디와 idx가 꼭 필요합니다.
 */
export async function DELETE({ request }) {
	const requestData = await request.json();
	const { idx, user_id } = requestData;
	let result = false;

	// data 유효성 검사
	if (!idx || !user_id) {
		const resp = {
			isSuccess: result,
			error_message: "정보가 누락 되었습니다.",
		};
		return json(resp);
	}

	// supabase 데이터 저장.
	try {
		await supabase
			.from("MOKJANG")
			.delete()
			.eq("idx", idx)
			.eq("user_id", user_id);
	} catch (err) {
		const errorMsg = "목장 삭제 중 에러가 발생했습니다.";
		console.error(err, errorMsg);
		const resp = {
			isSuccess: result,
			error_message: errorMsg,
		};
		return json(resp);
	}

	result = true;
	return json({ isSuccess: result });
}

/**
 * current_use가 있으면 끕니다.
 */
async function disableCurrentUse(currentUse, userId) {
	console.log(currentUse, userId);
	if (!currentUse) return;
	const { data } = await supabase
		.from("MOKJANG")
		.update({
			current_use: false,
		})
		.eq("user_id", userId)
		.eq("current_use", true);

	console.log("current_use 업데이트!!!!", data);
}
