<script lang="ts">
  import { enhance } from "$app/forms";
  import { each } from "svelte/internal";
  import type { ActionData, PageServerData } from "./$types";

  export let form: ActionData;
  export let data: PageServerData;

  import { browser } from "$app/environment";
  import { page } from "$app/stores";
  import { onDestroy } from "svelte";

  import ReconnectingEventSource from "reconnecting-eventsource";

  if (browser) {
    let es: ReconnectingEventSource;
    es = new ReconnectingEventSource(`/catalog/${$page.params.prod}`);
    es.onmessage = (event) => {
      const message = JSON.parse(event.data);
      /* add the new message */
      if (message) {
        message.createdAt = new Date(message.createdAt.toString());
        data.Comments = [message, ...data.Comments];
      }
    };
    onDestroy(() => {
      es.close();
    });
  }
</script>

<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Lato:wght@700&display=swap"
  rel="stylesheet"
/>
<div class="block" />
<div class="main-container">
  <div class="sub-container">
    <div class="prod-container" style="word-wrap:break-word;">
      <div >
      <img class="img"
        src="https://placeholder.pics/svg/200/18181c/FF6E31/PlaceHolder"
        alt=""
      />
    </div>
    <div class="desc">

      <p>{data.prodName}</p>
       <div>
      <p class="price">Price: {data.price}</p>
      
    </div>
    <p>{data.desc}</p>
    </div>
    
  </div>

    </div>
    

  <!-- Comment section -->
  <div class="thread">
    <p style="margin-left:10px">Comments</p>
    {#each data.Comments as item}
      <div class="thread-each">
        <p style="margin-left:10px">{item.sentBy}</p>
        <p>{item.message}</p>
      </div>
    {/each}
    {#if data?.userid}
      <div class="add-comment">
        <form
          use:enhance={({ form }) => {
            form.reset();
          }}
          method="post"
          action="?/write"
        >
          <input class="comment-add"
            required
            type="text"
            name="messageDisc"
            placeholder="Add Comment"
            id=""
          />
          {#if form?.error}
            {form.error}
          {/if}
        </form>
      </div>
    {/if}
  </div>
</div>

<style>
  .main-container {
    min-width: 0;
    min-height: 0;
    overflow: hidden;
  }
  .sub-container {
    font-family: lato;
    color: white;
    display: flex;
    margin: 50px auto auto auto;
    width: clamp(300px, 80%, 800px);
    height: 325px;
    border-radius: 10px;
    background-color: #242429;
    border: 1px solid #303036;
  }
  .price {
    color: #537fe7;
    display: inline-block;
  }

  .block {
    width: 100%;
    background-color: rgba(0, 0, 0, 0);
    height: 53px;
  }

  .thread {
    padding-top: 10px;
    display: grid;
    align-items: center;
    grid-template-columns: auto;
    grid-column-start: auto;
    background-color: #242429;
    border-radius: 20px;
    border: 1px solid #303036;
    color: white;
    font-family: lato;
    width: clamp(300px, 80%, 800px);
    margin: 50px auto 50px auto;
    gap: 20px;
  }
  .thread-each {
    display: flex;
    background-color: #18181c;
    border-radius: 12px;
    margin-left: 10px;
    border: 1px solid #ffffff1a;
    width: clamp(275px, 80%, 300px);
    height: 50px;
    gap: 25px;

  }

  .add-comment {
    background-color: #18181c;
    color: white;
    font-family: lato;
    width: clamp(275px, 80%, 300px);    
    margin: 0px auto 20px 10px;
    display: flex;
    align-items: center;
    border-radius: 10px;
    border: 1px solid #ffffff1a;
    height: 50px;
  }

  .comment-add {
    outline: none;
    background-color: #18181c;
    display: flex;
    margin-left: 10px;
    align-items: center;
    background-color: #18181c;
    border: 0px solid #ffffff1a;
    color: white;
    font-family: lato ;
  }

  .img {
    width:clamp(100px, 200px, 200px)
  }

  .desc {
    display: flex;
    justify-content: center;
    margin-left: 10px;
  }
</style>
