<script>
	import { supabase } from "$lib/supabaseClient";
	import { enhance } from '$app/forms';

	async function googleLogin() {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: "google",
			options: {
				queryParams: {
					access_type: "offline",
					prompt: "consent",
				},
				redirectTo: "/mokjang",
				skipBrowserRedirect: false
			},
		});

		console.log("구글 로그인 후 얻는 데이터", data, error);
	}

	const submit = async ({action, cancel}) => {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'google'
		});

		cancel();
	}
</script>

<main class="card">
	<div>
		<h1>MOKJANG</h1>
		<form method="POST">
			<button class="btn btn-lg btn-primary" formaction="?/login">
				<i class="fa-brands fa-google"></i> 구글 로그인
			</button>
		</form>
	</div>
</main>

<style>
	main {
		margin: auto;
		margin-top: calc(50vh - 101px);
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
