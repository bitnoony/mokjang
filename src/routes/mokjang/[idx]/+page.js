import { supabase, checkUser } from "$lib/supabaseClient";
import { redirect, error } from "@sveltejs/kit";
export const ssr = false;

export async function load({ params }) {
	const idx = params.idx;
	const user = await checkUser();
	const userId = user?.id;

	let { data: MOKJANG, error: err } = await supabase
		.from("MOKJANG")
		.select("*")
		.eq("user_id", userId)
		.eq("idx", idx)
		.maybeSingle();

	if (!MOKJANG) {
		throw redirect(302, "./mokjang/list");
	}

	return { mokjang: MOKJANG, mokjaId: userId };
}
