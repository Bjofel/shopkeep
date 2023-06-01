<script lang="ts">
  import { enhance } from "$app/forms";
  import { each } from "svelte/internal";
  import type {
    ActionData,
    PageServerData,
  } from "../../../../../.svelte-kit/types/src/routes/(authenticated)/forum/[forum]/$types";

  export let data: PageServerData;
  export let form: ActionData;
</script>

<link
  href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Oswald:ital@0;1&display=swap"
  rel="stylesheet"
/>

<h1>Messages</h1>
<hr />
<!-- The main forum post -->
<div class="OriginalPoster">
  <h2 id="white">{data?.postTitle}</h2>
  <h3 id="white">{data?.posterTalk}</h3>
  <p id="white">Post made by: {data?.uploader}</p>
</div>

<hr />

<!-- Add comments to post -->
<form
  use:enhance={({ form }) => {
    form.reset();
  }}
  method="post"
  action="?/write"
>
  <input required type="text" name="messageDisc" placeholder="message" id="" />
  <button type="submit">write message</button>
  {#if form?.error}
    {form.error}
  {/if}
</form>

<!-- Comment section -->
<div class="thread">
  {#each Object.entries(data?.disscusion) as [indexNumber, item]}
    <div id="objectThreads">
      <p>{item.message} <br />Sent By {item.sentBy} at {item.createdAt}</p>
    </div>
  {/each}
</div>

<style>
  .OriginalPoster {
    color: blue;
  }

  #white {
    color: black;
    font-family: oswald;
  }

  .thread {
    display: grid;
    grid-template-columns: auto;
    background-color: #171a21;
    border-radius: 20px;
    width: 60em;
    margin: auto;
  }

  #objectThreads {
    background-color: #2a475e;
    width: 40em;
    color: #c7d5e0;
    display: flex;
    justify-content: center;
    font-family: oswald;
    margin: auto;
    margin-top: 20px;
    border-radius: 20px;
  }
</style>
