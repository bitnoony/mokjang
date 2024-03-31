import { supabase, checkUser } from "$lib/supabaseClient";
import { goto } from "$app/navigation";

export const ssr = false;
export async function load() {
	// 사용자 정보를 가져온다.
	const user = await checkUser();
	const authId = user.id;

	// 디비에서 사용자 정보를 조회 한다.
	const { data, error } = await supabase
		.from("USERS")
		.select("*")
		.eq("id", user.id)
		.maybeSingle();

	const userId = data?.id ?? "";

	if (userId === authId) {
		// 만약 정보가 있으면, 목장으로 넘긴다.
		goto("/mokjang/list");
	} else if (userId === "") {
		// 만약 정보가 없으면, 목자 정보를 넣고 목자 정보 데이터로 넘긴다.
		const { full_name, picture, email } = getUserData(user)
		try {
			// USERS 테이블 insert
			let { error: usersError } = await supabase
				.from("USERS")
				.upsert({
					id: authId,
					mokja_id: authId,
					name: full_name,
					profile_image: picture,
					type: "목자", // 목자가 본인 데이터 수정
				});
			if (usersError) throw usersError;

			// USER_INFO 테이블 insert
			let { error: userInfoError } = await supabase
				.from("USER_INFO")
				.upsert({
					id: authId,
					email: email
				});
			if (userInfoError) throw userInfoError;

			goto("/user-form");
		} catch (e) {
			console.error(e);
			alert("로그인 중 오류가 발생했습니다.\n관리자에게 문의하세요.");
			location.href = "/";
		}
	} else {
		alert("정상적이지 않은 접근 발견.\n관리자에게 문의하세요.");
		await supabase.auth.signOut();
		location.href = "/";
	}
}

function getUserData(user) {
	const { user_metadata } = user;
	const {
		full_name,
		picture,
		email
	} = user_metadata;

	return { full_name, picture, email }
}