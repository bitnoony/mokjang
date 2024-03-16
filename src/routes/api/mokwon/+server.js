import { supabase } from "$lib/supabaseClient";
import { json } from "@sveltejs/kit";

// 조회
export async function GET ({ url }) {
	const selectedMokwonId = url.searchParams?.get('id');
	let result = false;

	// 목원 아이디 유효성 검사 체크
	if (!selectedMokwonId) {
		const resp = {
			isSuccess: result,
			error_message: "사용자 정보를 가져오는 중, 문제가 발생했습니다."
		}
		return json(resp);
	}

	// 클릭한 목원 정보
	let mokwonInfo = await supabase
		.from("USERS")
		.select("*, USER_INFO(*)")
		.eq("id", selectedMokwonId)
		.maybeSingle();
	
	result = true;
	return json({
		result,
		mokwonInfo
	});
}

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

		// 트랜젝션 종료
	} catch (err) {
		console.error(err, '목원 INSERT 중 에러 발생.');
	}

	result = true;
	return json({ isSuccess: result });
}

async function insertUser({name, type, mokja_id}) {
	const { data, error } = await supabase.from('USERS')
	.insert([{ name, type, mokja_id },]).select();

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
		entrance: inputData.entrance,
	}

	const { data, error } = await supabase.from('USER_INFO')
		.insert(insertData)
		.select();

	return data;
}

// 수정
export async function PUT ({request}) {
	const data = await request.json();
	let result = false;

	// data 안에 id, name, type 이 있는가? validation
	if (!data.id || !data.name || !data.type) {
		const resp = {
			isSuccess: result,
			error_message: "정보가 누락 되었습니다."
		}
		return json(resp);
	}

	try {		
		const usersResult = await supabase.from('USERS')
			.update({
				name: data.name, 
				type: data.type,
				modified_date: new Date().toISOString()
			})
			.eq("id", data.id);

		console.log("usersResult", usersResult);

		if (usersResult.error) {
			throw "users update failed";
		}

		const userInfoResult = await supabase.from('USER_INFO')
			.update({
				birthday: data.birthday,
				phone: data.phone,
				job: data.job,
				email: data.email,
				partner: data.partner,
				home_address: data.home_address,
				job_address: data.job_address,
				family: data.family,
				training: data.training,
				baptism: data.baptism,
				entrance: data.entrance,
			})
			.eq("id", data.id);

		console.log("userInfoResult", userInfoResult);
		if (userInfoResult.error) {
			throw "users update failed";
		}
		
	} catch (err) {
		console.error(err, '목원 UPDATE 중 에러 발생.');
		return json({ isSuccess: false });
	}

	result = true;
	return json({ isSuccess: result });
}

// 삭제
export async function DELETE ({url}) {
	const targetMokwonId = url.searchParams?.get('id');
	let result = false;

	// data 안에 name과 type이 있는가? validation
	if (!targetMokwonId) {
		const resp = {
			isSuccess: result,
			error_message: "정보가 누락 되었습니다."
		}
		return json(resp);
	}

	try {
		const { data, error } = await supabase.from('USERS')
			.update({deleted_date: new Date().toISOString()})
			.eq("id", targetMokwonId);
	} catch (err) {
		console.error(err, '목원 DELETE 중 에러 발생.');
	}
	
	result = true;
	return json({ isSuccess: result });
}