import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import { redirect } from '@sveltejs/kit';

export async function handle ({event, resolve}) {
	event.locals.supabase = createSupabaseServerClient({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event
	});

	// 세션을 가져온다.
	event.locals.getSession = async () => {
		const { data: {session} } = await event.locals.supabase.auth.getSession();
		return session;
	}

	const session = await event.locals.getSession();
	// console.log(session);

	// 세션을 체크한다.
	if (!session && event.url.pathname !== '/login') {
		throw redirect(303, '/login'); // login page
	} else if (session) {
		throw redirect(300, '/mokjang');
		// 1. 세션 사용자의 정보로 현재 목장 정보를 가져온다.
		// 2. if (목장 정보가 없다.) => 목장 리스트
		// 3. if (목장 정보가 있다.) => /mokjang/[id] 보낸다.
	}

	const response = await resolve(event);
	return response;
}