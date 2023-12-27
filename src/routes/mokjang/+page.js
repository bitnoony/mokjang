import { supabase } from "$lib/supabaseClient";
import { redirect } from "@sveltejs/kit";
export const ssr = false;

export async function load() {
	const {data: { user }} = await supabase.auth.getUser();
	const userId = user?.id;
	
	let { data: MOKJANG, error } = await supabase
		.from('MOKJANG')
		.select("*")
		.eq('user_id', userId);

	if (!MOKJANG) {
		throw redirect(302, './mokjang/list');
	}

	return { mokjang: MOKJANG };
}