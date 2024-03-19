<script>
    import { toasts, ToastContainer, FlatToast }  from "svelte-toasts";
</script>

<style>
</style>

<ToastContainer 
    placement="bottom-right"
    theme="dark"
    duration={3000}
    {toasts} 
    let:data={data}>
    <FlatToast {data} /> <!-- default slot as toast component -->
</ToastContainer>