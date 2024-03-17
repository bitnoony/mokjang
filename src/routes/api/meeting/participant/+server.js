import { supabase } from "$lib/supabaseClient";
import { json } from "@sveltejs/kit";

// insert는 post!!
export async function POST({ request }) {
	const requestData = await request.json();
	const { meeting_idx, id, writer_id } = requestData;
	let result = false;

	if (!meeting_idx || !id) {
		const resp = {
			isSuccess: result,
			error_message: "정보가 누락 되었습니다.",
		};
		return json(resp);
	}

	try {
		const { data } = await supabase
			.from("MEETING_GROUP")
			.select("group_idx")
			.eq("meeting_idx", meeting_idx)
			.eq("attending_user", id)
			.maybeSingle();

		if (data?.group_idx) return json({ isSuccess: true });

		const {
			data: { group_idx },
		} = await supabase
			.from("MEETING_GROUP")
			.upsert({ meeting_idx, attending_user: id })
			.select("group_idx")
			.maybeSingle();

		// 메모 만들기
		await supabase.from("MEMO").insert([
			{
				meeting_group_idx: group_idx,
				writer_id: writer_id,
			},
		]);
	} catch (e) {
		const errorMsg = `목원 ${id}를 출석하는데 에러가 발생했습니다.`;
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

export async function DELETE({ request }) {
	const requestData = await request.json();
	const { group_idx } = requestData;
	let result = false;

	if (!group_idx) {
		const resp = {
			isSuccess: result,
			error_message: "정보가 누락 되었습니다.",
		};
		return json(resp);
	}

	try {
		await supabase.from("MEMO").delete().eq("meeting_group_idx", group_idx);

		await supabase.from("MEETING_GROUP").delete().eq("group_idx", group_idx);
	} catch (err) {
		const errorMsg = "참여자 삭제 중 에러가 발생했습니다.";
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
