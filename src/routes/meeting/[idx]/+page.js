import { supabase } from "$lib/supabaseClient";
import { redirect, error } from "@sveltejs/kit";
export const ssr = false;

export async function load({ params }) {
	const idx = params.idx;
	const {data: { user }} = await supabase.auth.getUser();
	const userId = user?.id;
	
	let { data: MEETING, error: err } = await supabase
		.from('MEETING')
		.select("*")
		.eq('writer_id', userId)
		.eq('idx', idx)
		.maybeSingle();

	if (!MEETING) {
        alert("잘못된 접근입니다.")
		window.history.back();
	}

	return { meeting: MEETING, userId };
}