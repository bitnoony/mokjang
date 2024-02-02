import { supabase } from "$lib/supabaseClient";

async function getMokwonList(userId) {
	let {data: mokwonList} = await supabase.from('USERS').select("*, USER_INFO (*)")
	.eq('mokja_id', userId).is('deleted_date', null);

	// 목원 리스트를 정렬한다: 목자 우선순위
	mokwonList = mokwonList.sort((a) => {
		return a.mokja_id === a.id ? -1 : 0;
	});

	return { mokwonList, mokja_id: userId };
}

// 
async function getMokwonListInMokjang(userId, mokjangIdx) {
	// 목원 리스트 뽑아오기
	let { mokwonList } = await getMokwonList(userId);
	
	// 목원 소속 여부 뽑기
	let {data: mokwonLink} = await supabase.from('MOKWON').select('*')
		.eq('mokjang_idx', mokjangIdx);

	// 데이터 정제
	for (const {user_id} of mokwonLink) {
		mokwonList.map(m => {
			// 목원 링크가 되어있거나 목자면
			if (m.id === user_id || m.type === "목자") {
				m.isMokwon = true; // 목원이다.
				return m;
			}
		});
	}

	// 목원 리스트를 정렬한다: 목자 우선순위
	mokwonList = mokwonList.sort((a) => {
		return a.mokja_id === a.id ? -1 : 0;
	});

	return { mokwonList, mokja_id: userId };
}

export {getMokwonList, getMokwonListInMokjang}