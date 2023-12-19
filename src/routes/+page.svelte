<script>
	import { supabase } from '$lib/supabaseClient'

	async function googleLogin() {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				queryParams: {
					access_type: 'offline',
					prompt: 'consent',
				},
			},
		});

		console.log(data, error);
	}
</script>

<button on:click={e => googleLogin()} class="btn btn-success">구글 로그인</button>