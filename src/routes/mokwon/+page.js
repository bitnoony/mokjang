import { checkUser } from "$lib/supabaseClient";
import { getMokwonList } from "./mokwon.js";
export const ssr = false;

export async function load() {
	const user = await checkUser();
	const userId = user?.id;
	// 목원 리스트
	return getMokwonList(userId);
}
