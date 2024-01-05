import { supabase } from "$lib/supabaseClient";
export const ssr = false;

export async function load() {
	const {data: { user }} = await supabase.auth.getUser();
	const userId = user?.id;

	let { data: MOKJANG, error } = await supabase
	.from('MOKJANG')
	.select("*")
	.eq('user_id', userId);

	console.log("MOKJANG", MOKJANG);

	return { mokjangList: MOKJANG };
};