import { goto } from "$app/navigation";
import { supabase, checkUser } from "$lib/supabaseClient";
export const ssr = false;

export async function load() {
	const user = await checkUser();

	const userId = user.id;
	// const {full_name, picture, email} = user.user_metadata;
	
	let {data} = await supabase
		.from("USERS")
		.select("*, USER_INFO(*)")
		.eq("id", userId)
		.maybeSingle();

	return data;
}
