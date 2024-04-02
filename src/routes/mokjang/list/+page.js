import { supabase, checkUser } from "$lib/supabaseClient";
export const ssr = false;

export async function load() {
	const user = await checkUser();
	const userId = user?.id;

	let { data: MOKJANG, error } = await supabase
		.from("MOKJANG")
		.select("*")
		.eq("user_id", userId)
		.is("deleted_date", null)
		.order("current_use", { ascending: false })
		.order("created_date", { ascending: false });

	return {
		mokjangList: MOKJANG,
		userId,
	};
}
