import { supabase } from "$lib/supabaseClient";

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

	// 서버에 회원가입 API 호출을 하는 함수.
	const response = await fetch(`/api/users`, {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			"content-type": "application/json",
		},
	});

	// ture
	console.log(response);
}