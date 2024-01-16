import { supabase } from "$lib/supabaseClient";
import { json } from "@sveltejs/kit";

// 조회
// 본인 아이디 외 목원들

// 생성
export async function POST ({request}) {
	const data = await request.json();
	let result = false;

	// data 안에 name과 type이 있는가? validation
	if (!data.name || !data.type) {
		const resp = {
			isSuccess: result,
			error_message: "정보가 누락 되었습니다."
		}
		return json(resp);
	}
	// 프로필사진은 나중에

	try {
		// 트랜젝션 시작

		// 유저 추가 (목원)
		const userData = await insertUser(data);
		if (userData.length === 0) throw "insert mokwon error";
		
		const { id } = userData[0];

		// 유저 정보 추가 (목원)
		await insertUserInfo(data, id);

		// 목원과 목장을 연결..

		// 트랜젝션 종료
	} catch (err) {
		console.error(err, '목원 INSERT 중 에러 발생.');
	}

	result = true;
	return json({ isSuccess: result });
}

async function insertUser({name, type}) {
	const { data, error } = await supabase.from('USERS')
	.insert([{ name, type },]).select();

	return data;
}

async function insertUserInfo(inputData, id) {
	const insertData = {
		id: id,
		birthday: inputData.birthday,
		phone: inputData.phone,
		job: inputData.job,
		email: inputData.email,
		partner: inputData.partner,
		home_address: inputData.home_address,
		job_address: inputData.job_address,
		family: inputData.family,
		training: inputData.training,
		baptism: inputData.baptism,
		enterance: inputData.enterance,
	}

	const { data, error } = await supabase.from('USER_INFO')
		.insert(insertData)
		.select();

	return data;
}

// 수정

// 삭제