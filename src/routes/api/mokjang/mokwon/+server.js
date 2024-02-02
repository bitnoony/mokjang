import { supabase } from "$lib/supabaseClient";
import { json } from "@sveltejs/kit";

export async function POST({ request }) {
    const requestData = await request.json();
	const {mokjang_idx, user_id} = requestData;
	let result = false;

    if (!mokjang_idx || !user_id) {
        const resp = {
			isSuccess: result,
			error_message: "정보가 누락 되었습니다."
		}
		return json(resp);
    }

    try {
        await supabase.from("MOKWON")
            .insert(requestData)
            .select("*");
    } catch (e) {
		const errorMsg = '목원 연결 중 에러가 발생했습니다.';
		console.error(err, errorMsg);
		const resp = {
			isSuccess: result,
			error_message: errorMsg
		}
		return json(resp);
    }

    result = true;
	return json({ isSuccess: result });
}

export async function DELETE({ request }) {
    const requestData = await request.json();
	const {mokjang_idx, user_id} = requestData;
	let result = false;

    // data 유효성 검사
	if (!mokjang_idx || !user_id) {
		const resp = {
			isSuccess: result,
			error_message: "정보가 누락 되었습니다."
		}
		return json(resp);
	}

	// supabase 데이터 저장.
	try {
		await supabase.from('MOKWON').delete()
			.eq('mokjang_idx', mokjang_idx)
			.eq('user_id', user_id);
	} catch (err) {
		const errorMsg = '목원 연결 해제중 에러가 발생했습니다.';
		console.error(err, errorMsg);
		const resp = {
			isSuccess: result,
			error_message: errorMsg
		}
		return json(resp);
	}

	result = true;
	return json({ isSuccess: result });
}