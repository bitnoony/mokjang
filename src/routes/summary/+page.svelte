<script>
    export let data;
    const length = data.record.length;

</script>

    <div style="height:100%; padding:10px">
        <div style="width: 100%; float:left; height:100%">
            <div class="card">
                <div class="card-body" style="text-align:center">
                  우리들교회 주일설교 말씀녹취
                </div>
            </div>
            <div class="list-group" style="width:100%">
                {#each data.record as r, i }
            <a type="button" class="list-group-item list-group-item-action" href= "./summary/{r.id}">{length - i} | {r.sermon_date} | {r.title}</a>

            {/each}
        </div>
            
            <!-- <nav aria-label="Page navigation example">
                <ul class="pagination">
                  <li class="page-item"><a class="page-link" href="#">Previous</a>
                  </li>
                  <li class="page-item"><a class="page-link" href="#">1</a>
                  </li>
                  <li class="page-item"><a class="page-link" href="#">2</a>
                  </li>
                  <li class="page-item"><a class="page-link" href="#">3</a>
                  </li>
                  <li class="page-item"><a class="page-link" href="#">Next</a>
                  </li>
                </ul>
            </nav>  -->
    </div>
    </div>
