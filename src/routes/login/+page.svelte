<script>
	import "bootstrap/dist/css/bootstrap.css";
	import "@fortawesome/fontawesome-free/css/all.min.css";
	import { supabase } from "$lib/supabaseClient";

	async function googleLogin() {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				queryParams: {
					access_type: 'offline',
					prompt: 'consent',
				},
				// redirectTo: PUBLIC_BASE_URL,
				// skipBrowserRedirect: false,
			},
		})
	}
</script>

<main class="card">
	<div>
		<h1>MOKJANG</h1>
		<button class="btn btn-lg btn-primary" on:click={googleLogin}>
			<i class="fa-brands fa-google"></i> 구글 로그인
		</button>
	</div>
</main>

<style>
	main {
		margin: auto;
		margin-top: calc(50vh - 160px);
		width: 400px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	main > div {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 48px 0;
	}
</style>
