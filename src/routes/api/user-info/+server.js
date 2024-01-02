import { supabase } from "$lib/supabaseClient";

export async function POST(requestEvent) {
	// formData 사용법
	// https://kit.svelte.dev/docs/web-standards#formdata
	const { request, redirect } = requestEvent;
	const data = await request.formData();

	// id가 없으면 false
	const birthday = data.get('birthday');
    const job = data.get('job');
    const job_address = data.get('job_address');
    const home_address = data.get('home_address');
    const training = data.get('training');
    const baptism = data.get('baptism');
    const enterance = data.get('enterance');
    const family = data.get('family');
    const partner = data.get('partner');
    const email = data.get('email');
    const phone = data.get('phone');
    const memo = data.get('memo');
    const id = data.get('id');

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
            enterance,
            family,
            partner,
            email,
            phone,
            memo
		};

		const { data, error } = await supabase.from('USER_INFO')
			.upsert(insertData)
			.select();

		console.log(data, error);

		if (!error) {
			throw redirect(302, '/mokjang/list');
		}
	} catch (err) {
		console.error(err, '회원 INSERT 중 에러 발생.');
	}

	// form 태그로 들어갔을때 form
	return new Response().redirected = '';
}
