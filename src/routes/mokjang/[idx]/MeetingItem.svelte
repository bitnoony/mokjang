<script>
    export let title;
    export let date;
    export let place;
    export let members = [];
    let memberCount = members.length;

    console.log("여긴 아이테밍여", title, date, place);
</script>

<style></style>

<!-- 날짜, 장소, 참여자, 참석수. 제목 -->
<a href="#" class="list-group-item list-group-item-action" aria-current="true">
    <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">{title}</h5>
        <small>{date}</small>
    </div>
    <p class="mb-1">{place}</p>
    <small>
        <span>[{memberCount}]</span>
        {#each members as member}
            <span>'{member}'</span>&nbsp;
        {/each}
    </small>
</a>