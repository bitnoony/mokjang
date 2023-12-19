import { supabase } from '$lib/supabaseClient'

export async function load() {
	// cookie 안에 사용자 정보가 있으면, 로그인을 시키고
	// 없으면 로그인 페이지로 넘어간다.

	return {
		test: "test",
	}
}
