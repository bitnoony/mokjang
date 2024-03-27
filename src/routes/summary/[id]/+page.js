import { supabase, checkUser } from "$lib/supabaseClient";

export async function load({ params }) {
	const id = params.id;

	let { data: RECORD, error } = await supabase
	.from('RECORD')
	.select("*")
	.eq('id', id);

	return { record: RECORD };
}
