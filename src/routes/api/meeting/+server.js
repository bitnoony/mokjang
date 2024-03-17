import { supabase } from "$lib/supabaseClient";
import { json } from "@sveltejs/kit";

export async function POST({ request }) {
	const requestData = await request.json();
	const { mokjang_idx, writer_id } = requestData;
	let result = false;

	if (!mokjang_idx || !writer_id) {
		const resp = {
			isSuccess: result,
			error_message: "정보가 누락 되었습니다.",
		};
		return json(resp);
	}

	let resp = null;
	try {
		resp = await supabase.from("MEETING").insert(requestData).select("idx");
	} catch (e) {
		const errorMsg = "모임 생성중 에러가 발생했습니다.";
		console.error(err, errorMsg);
		const resp = {
			isSuccess: result,
			error_message: errorMsg,
		};
		return json(resp);
	}
	const idx = resp.data[0].idx;
	result = true;
	return json({ isSuccess: result, idx });
}
