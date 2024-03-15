<script>
    export let historyMemoData;
    const {
        created_date,
        content
    } = historyMemoData
</script>

<style>
</style>

<div class="list-group-item list-group-item-action">
    {created_date}, {content}
</div>