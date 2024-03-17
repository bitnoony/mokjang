import { supabase } from "$lib/supabaseClient";

// GET 조회 : 유저 정보 조회
export async function GET({ request }) {
	console.log("/api/users에서 찍은 request 내용 : ", request.url);
	console.log("/api/users에서 찍은 user id : ", request.search);
	const params = request.url.split("?")[1];
	console.log(params.split("=")[1]);

	return new Response("test user");
}

// POST 생성: 회원가입
export async function POST({ request }) {
	let result = false; // 결과

	// request로부터 데이터 받아옴.
	const requestData = await request.json();
	console.log("/api/users에서 찍은 데이터 : ", requestData);
	const { id, name, image } = requestData;

	// DB에 데이터 insert
	try {
		let insertData = { id: id, name: name, profile_image: image, type: "목자" };
		const { data, error } = await supabase
			.from("USERS")
			.insert([insertData])
			.select();

		result = true;
	} catch (err) {
		console.error(err, "회원 INSERT 중 에러 발생.");
	}

	// 성공여부 반환
	return new Response(result);
}

// PUT 유저 update
// DELETE 삭제

// 회원가입. RESTful API (약속.)
// GET, POST, PUT, DELETE => methods
// READ, CREATE, UPDATE, DELETE
