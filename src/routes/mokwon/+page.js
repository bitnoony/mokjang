import { supabase } from "$lib/supabaseClient";
export const ssr = false;

export async function load() {
	const {data: { user }} = await supabase.auth.getUser();
	const userId = user?.id;

	let {data: mokwonList} = await supabase.from('USERS').select("*, USER_INFO (*)")
		.eq('mokja_id', userId).is('deleted_date', null);

	// 목원 리스트를 정렬한다: 목자 우선순위
	mokwonList = mokwonList.sort((a) => {
		return a.mokja_id === a.id ? -1 : 0;
	});

	return { mokwonList, mokja_id: userId };
}