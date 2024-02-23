import { supabase } from "$lib/supabaseClient";
import { json } from "@sveltejs/kit";

export async function PATCH({ request }) {
    const requestData = await request.json();
	const {meeting_group_idx, content, comment} = requestData;
	let result = false;

    if (!meeting_group_idx) {
        const resp = {
			isSuccess: result,
			error_message: "정보가 누락 되었습니다."
		}
		return json(resp);
    }

    let resp = null;
    try {
        resp = await supabase.from("MEMO")
            .update({
                content, 
                comment, 
                modified_date: new Date().toISOString()
            })
            .eq('meeting_group_idx', meeting_group_idx)
    } catch (e) {
		const errorMsg = '메모 수정 중 에러가 발생했습니다.';
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