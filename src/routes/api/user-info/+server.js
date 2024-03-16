import { supabase } from "$lib/supabaseClient";
import { json } from "@sveltejs/kit";

export async function POST({ request }) {
	// formData 사용법
	// https://kit.svelte.dev/docs/web-standards#formdata
	const data = await request.json();
	let result = false;

	// id가 없으면 false
	const birthday = data['birthday'];
    const job = data['job'];
    const job_address = data['job_address'];
    const home_address = data['home_address'];
    const training = data['training'];
    const baptism = data['baptism'];
    const entrance = data['entrance'];
    const family = data['family'];
    const partner = data['partner'];
    const email = data['email'];
    const phone = data['phone'];
    const memo = data['memo'];
    const id = data['id'];

	// id로 DB에서 유저 정보 조회. USERS
	// 유저가 있나? 없으면 result = false;

	// 있으면
	// DB에 저장. + id도 포함.	
    try {
		let insertData = { 
			id, 
            birthday,
            job,
            job_address,
            home_address,
            training,
            baptism,
            entrance,
            family,
            partner,
            email,
            phone,
            memo
		};

		const { data, error } = await supabase.from('USER_INFO')
			.upsert(insertData)
			.select();

		if (!error) result = true;
	} catch (err) {
		console.error(err, '회원 INSERT 중 에러 발생.');
	}

	return new Response(result)
}
