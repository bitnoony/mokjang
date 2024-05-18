<!-- script -->
<script>
	import "bootstrap/dist/css/bootstrap.css";
	import bootstrapBundle from "bootstrap/dist/js/bootstrap.bundle.js?url";
	import "@fortawesome/fontawesome-free/css/all.min.css";
	import imgLogo from "$lib/assets/logo.png";
	import { supabase, getUser } from "$lib/supabaseClient";
	import { page } from '$app/stores';
	import title from '$lib/utils/LayoutTitle';
	let isHomeLayout = true;
	let isAdmin = false;

	init();

	async function init() {
		const user = await getUser();

		if (user) {
			isHomeLayout = false;
		} else {
			isHomeLayout = true;
		}
	
		if (user?.id === "9cfdad21-7291-4098-8b91-f737d6994766") {
			isAdmin = true;
		} else {
			isAdmin = false;
		}
	}

	async function login() {
		let pageUrl = $page.url.href;
		pageUrl = pageUrl.replace(/(^https?:\/\/)w{3}\.(.+)$/, '$1$2');
		const PUBLIC_BASE_URL = `${pageUrl}login`;
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
	}

	async function logout() {
		if (confirm("정말로 로그아웃 하시겠습니까?")) {
			await supabase.auth.signOut();
			location.href = "/";
		}
	}
</script>

<!-- dom -->
<svelte:head>
	<script src={bootstrapBundle}></script>
</svelte:head>
<nav class="layout-nav-wrap">
	{#if isHomeLayout}
		<div class="homepage-layout layout-nav">
			<div class="left-part">
				<div class="title-wrap">
					<a href="/">
						<img src={imgLogo} alt="logo" />
						<h3 class="m-0 fw-bold">MOKJANG</h3>
					</a>
				</div>
			</div>
			<div class="middle-part">&nbsp;</div>
			<div class="right-part">
				<button class="btn btn-outline-success" on:click={login}>
					<i class="fa-solid fa-right-to-bracket"></i> 로그인
				</button>
			</div>
		</div>
	{:else}
		<div class="main-layout layout-nav">
			<div class="left-part">
				<a href="/" class="btn btn-secondary">
					<i class="fa-solid fa-home"></i>
				</a>
				<a href="/mokjang/list" class="btn btn-outline-secondary">
					<i class="fa-solid fa-layer-group"></i>
					목장 리스트
				</a>
			</div>
			<div class="middle-part">
				<span class="fw-bold fs-3">{$title}</span>
			</div>
			<div class="right-part">
				<a href="/mokwon" class="btn btn-outline-secondary">
					<i class="fa-solid fa-users"></i> 목원정보
				</a>
				<a href="/user-form" class="btn btn-outline-secondary">
					<i class="fa-solid fa-user"></i> 목자정보
				</a>
				<button class="btn btn-outline-secondary" on:click={logout}>
					<i class="fa-solid fa-right-from-bracket"></i>
				</button>
			</div>
		</div>
	{/if}
</nav>

<slot />

<style>
	@import "./page.css";
	@import "./layout.css";
</style>
