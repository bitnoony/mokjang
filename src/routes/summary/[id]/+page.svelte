<script>
    import Editor from '@tinymce/tinymce-svelte';
	export let data;
	const { id } = data;
</script>
<div style="height:100%; padding:10px">
    <div style="width: 50%; float:left; height:100%">
        <div class="card">
            <div class="card-body" style="text-align:center">
              녹취원본
            </div>
          </div>
          <div style="background-color:white; padding:10px; height:400px">
            dfssdfsdfs
            dfssdfsdfssd
            <br><br><br>
            dfssdfsdfssddsf
            sf<br><br><br>
dsfdssdf
          </div>

        
</div>
    <div style="width: 50%; float:left; height:100%">
        <div class="card">
            <div class="card-body" style="text-align:center">
              요약
            </div>
          </div>
        
        <Editor
          apiKey="2xt1jhdtpy8fz6m2xzedoqa70dyf31mw3jh6p6ekb3xf4jg5"
        />
    </div>
</div>