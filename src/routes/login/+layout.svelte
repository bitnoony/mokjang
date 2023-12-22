<!-- script -->
<script>
	import "bootstrap/dist/css/bootstrap.css";
	import bootstrapBundle from "bootstrap/dist/js/bootstrap.bundle.js?url";
	import "@fortawesome/fontawesome-free/css/all.min.css";
</script>

<!-- dom -->
<svelte:head>
	<script src={bootstrapBundle}></script>
</svelte:head>
<slot />

<!-- style -->
<style></style>
