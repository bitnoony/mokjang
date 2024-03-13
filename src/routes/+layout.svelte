<!-- script -->
<script>
	import "bootstrap/dist/css/bootstrap.css";
	import bootstrapBundle from "bootstrap/dist/js/bootstrap.bundle.js?url";
	import "@fortawesome/fontawesome-free/css/all.min.css";
	import { supabase } from "$lib/supabaseClient";
    import { onMount } from 'svelte';
    onMount(layoutSwitching);
	let isHomeLayout = false;

	async function layoutSwitching() {
		const path = window.location.pathname;
		const {data: { user }} = await supabase.auth.getUser();

		if (path === "/" || path.includes("login")) {
			isHomeLayout = true;
		} else {
			isHomeLayout = false;
		}
	}
</script>

<style>
	@import './page.css';
	nav.layout-nav-wrap {
		height: 60px;
		width: 100vw;
		background-color: white;
		border-bottom: 1px solid lightgray;
		display: flex;
		align-items: center;
	}

	nav.layout-nav-wrap > .layout-nav {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20px;
	}

	nav.layout-nav-wrap > .layout-nav > div.left-part {
		text-align: start;
		width: 25%;
	}
	nav.layout-nav-wrap > .layout-nav > div.middle-part {
		text-align: center;
		width: 50%;
	}
	nav.layout-nav-wrap > .layout-nav > div.right-part {
		text-align: end;
		width: 25%;
	}
</style>


<!-- dom -->
<svelte:head>
	<script src={bootstrapBundle}></script>
</svelte:head>
<nav class="layout-nav-wrap">
	{#if isHomeLayout}
	<div class="homepage-layout layout-nav">
		<div class="left-part">&nbsp;</div>
		<div class="middle-part">&nbsp;</div>
		<div class="right-part">
			<a href="/login" class="btn btn-secondary">
				<i class="fa-solid fa-right-to-bracket"></i> 로그인
			</a>
		</div>
	</div>
	{:else}
	<div class="main-layout layout-nav">
		<div class="left-part">
			<a href="/mokjang/list" class="btn btn-secondary">
				<i class="fa-solid fa-layer-group"></i>
				목장 리스트
			</a>
			<button class="btn btn-secondary" on:click={() => {history.back()}}>
				<i class="fa-solid fa-arrow-left"></i>
				뒤로가기
			</button>
		</div>
		<div class="middle-part">
			<span class="fw-bold fs-3">목장</span>
		</div>
		<div class="right-part">
			<a href="/mokwon" class="btn btn-secondary">
				<i class="fa-solid fa-users"></i> 목원정보
			</a>
			<a href="/user-form" class="btn btn-secondary">
				<i class="fa-solid fa-user"></i> 목자정보
			</a>
		</div>
	</div>
	{/if}
</nav>

<slot />
