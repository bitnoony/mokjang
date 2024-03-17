import { createClient } from "@supabase/supabase-js";
import {
	PUBLIC_SUPABASE_URL,
	PUBLIC_SUPABASE_ANON_KEY,
} from "$env/static/public";
import { goto } from "$app/navigation";

export const supabase = createClient(
	PUBLIC_SUPABASE_URL,
	PUBLIC_SUPABASE_ANON_KEY,
);

export const getUser = async () => {
	const { data: { user }, } = await supabase.auth.getUser();
	return user;
}

export const checkUser = async () => {
	const { data: { user }, } = await supabase.auth.getUser();
	if (!user) goto("/");
	return user;
}