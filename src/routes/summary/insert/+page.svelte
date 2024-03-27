<script>
    	import { supabase } from "$lib/supabaseClient";
		// import { goto } from "$app/navigation";
        let sermon_date,title,content,youtube_link;

        async function saveRecord(){
			
			const data = {
			sermon_date,
		        title,
		        content,
		        youtube_link
		    };

			const response = await fetch("/api/summary", {
			method: "POST",
			body: JSON.stringify(data),
			    headers: {
				"content-type": "application/json",
			},
		});

         }   

</script>


<div class="list-group-item mokwon-memo-wrap">
	<div class="memo-date-wrap">
		<span>설교 날짜 : </span>
		<input type="date" name="sermon_date" bind:value={sermon_date}
			class="form-control me-1" >
	</div>
    <div class="memo-date-wrap">
		<span>설교 제목 : </span>
		<input type="input" name="title" bind:value={title}
			class="form-control me-1" >
	</div>
    <div class="memo-date-wrap">
		<span >유튜브 링크 : </span>
		<input type="input" name="youtube_link" bind:value={youtube_link}
			class="form-control me-1" >
	</div>
	<div class="ms-1 d-flex align-items-center w-100" style="padding:0 16px">
		<textarea name="content" 
        bind:value={content}
        placeholder="메모를 입력하세요" class="form-control" rows="25"
		></textarea>
	</div>
    <button on:click={saveRecord}>저장</button>
</div>

<style>
    span {
        width: 100px;
        padding: 4px;
    }
	.mokwon-memo-wrap {
		background-color: #FEF9E7;
	}

	.mokwon-memo-wrap > .memo-date-wrap {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		font-weight: bold;
		margin-bottom: 0.3rem;
	}

	.mokwon-memo-wrap > .memo-date-wrap > input[type='date'] {
		width: 130px;
		border: 0;
		background-color: transparent;
		font-weight: bold;
		padding: 0 6px;
	}

	.mokwon-memo-wrap > div > textarea {
		resize: none;
	}

</style>