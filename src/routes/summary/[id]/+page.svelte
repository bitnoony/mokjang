<script>
  import Editor from '@tinymce/tinymce-svelte';
	export let data;
  const recordData = data.record[0];
  const recordContent = data.record[0].content.replace(/\n/g, "<br>");


</script>

<div style="height:100%; padding:10px">
    <div style="width: 50%; float:left; height:100%">
        <div class="card">
            <div class="card-body" style="text-align:center">
              녹취원본
            </div>
          </div>
          <div style="background-color:white; padding:10px; height:400px">
           { recordData.sermon_date}
           <hr>
           { recordData.title}
           <hr>
           {@html recordContent}
           
          </div>

        
</div>
    <div style="width: 50%; float:left; height:100%">
        <div class="card">
            <div class="card-body" style="text-align:center">
              요약
            </div>
          </div>
        
       <textarea style="width:100%;"></textarea>
    </div>
</div>