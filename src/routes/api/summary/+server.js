import { supabase } from "$lib/supabaseClient";
import { json } from "@sveltejs/kit";
import { goto } from "$app/navigation";

// 생성
export async function POST({ request }) {
	const data = await request.json();
    const userData = await insertUser(data);
    
}

async function insertUser({ sermon_date, title, content, youtube_link }) {
    const { data, error } = await supabase
        .from("RECORD")
        .insert([{ sermon_date, title, content, youtube_link }])
        .select();

    return data;
}