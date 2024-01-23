import { supabase } from "$lib/supabaseClient";
import {getMokwonList} from './mokwon.js';
export const ssr = false;

export async function load() {
	// 목원 리스트
	const {data: { user }} = await supabase.auth.getUser();
	const userId = user?.id;

	return getMokwonList(userId);
}