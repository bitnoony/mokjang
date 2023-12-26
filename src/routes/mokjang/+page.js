import { supabase } from "$lib/supabaseClient";
import { redirect } from "@sveltejs/kit";

export async function load() {
	const {data: { user }} = await supabase.auth.getUser();
	const userId = user?.id;

	// userId 여부 체크
	
	let { data: MOKJANG, error } = await supabase
		.from('MOKJANG')
		.select("*")
		.eq('user_id', userId);

	if (!MOKJANG) {
		throw redirect(302, './mokjang/list');
	}

	return { mokjang: MOKJANG };
}