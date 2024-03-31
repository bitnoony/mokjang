import { createClient } from "@supabase/supabase-js";
import {
	PUBLIC_SUPABASE_URL,
	PUBLIC_SUPABASE_ANON_KEY,
} from "$env/static/public";
import { page } from '$app/stores';
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

export async function login() {
	const PUBLIC_BASE_URL = `http://${location.host}/login`;
	
	if (!await getUser()) {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: "google",
			options: {
				queryParams: {
					access_type: "offline",
					prompt: "consent",
				},
				redirectTo: PUBLIC_BASE_URL,
				// skipBrowserRedirect: false,
			},
		});
	} else {
		goto("/login");
	}
}

export async function logout() {
	if (confirm("정말로 로그아웃 하시겠습니까?")) {
		await supabase.auth.signOut();
		location.href = "/";
	}
}