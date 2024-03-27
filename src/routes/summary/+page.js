import { supabase, checkUser } from "$lib/supabaseClient";
export const ssr = false;

export async function load() {

  let { data: RECORD, error } = await supabase
  .from('RECORD')
  .select('*')
  .range(0,9);

	if (!RECORD) {
		alert("잘못된 접근입니다.");
		window.history.back();
	}

	return { record: RECORD   };
}
