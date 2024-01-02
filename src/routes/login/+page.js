import { supabase } from "$lib/supabaseClient";
import { redirect } from "@sveltejs/kit";

export async function load ({fetch}) {
	const {
		data: { user },
	} = await supabase.auth.getUser();

	const userId = user?.id;
	const userName = user?.identities[0].identity_data.full_name;
	const picture = user?.identities[0].identity_data.picture;
	const data = {
		id: userId,
		name: userName,
		image: picture,
	}

	if (userId) {
		// 서버에 회원가입 API 호출을 하는 함수.
		const response = await fetch(`/api/users`, {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"content-type": "application/json",
			},
		});

		if (response.ok) {
			// 로그인이 되었으면 (userId 가있으면) user-form으로 redirect
			throw redirect(302, './user-form');
		} else {
			console.error("회원가입 중, 오류가 발생했습니다.", response);
		}
	}
}