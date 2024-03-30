<script>
	export let data;
  const recordData = data.record[0];
  const recordContent = data.record[0].content.replace(/\n/g, "<br>");


</script>

<div class="card" style="width:50%;height:100%; float:left;" >
    
        
            <div class="card-header" style="text-align:center">
              녹취원본
            </div>
          
          <div class="list-group list-group-flush" style="padding:10px;">
          
                <div class="list-group-item">
                 { recordData.sermon_date}
                </div>
                <div class="list-group-item">
                 { recordData.title}
                </div>

                <div class="list-group-item" >
                  <iframe width=100% height="400px"
                src="https://youtu.be/embed/04S2iJs57CQ">
                </iframe><br>
                 {@html recordContent}
                </div>        
          </div>
    </div>

    <div class="card" style="width: 50%; height:100%;float:left; ">
        
            <div class="card-header" 
            style="text-align:center;">
              요약
            </div>
            <div class="list-group list-group-flush" style="padding:10px;">
  
              <input class="list-group-item" type="text"
              placeholder="제목">
  
              <textarea class="list-group-item editable-area form-control" 
             
              placeholder="본문"


              ></textarea>

            </div>
     
    </div>
<style>
  textarea {
    width:100%;
    height : 48em; 
    resize : none;
    border : none;
  }
</style>