<script lang="ts">
  import { enhance } from "$app/forms";
  import type {
    ActionData,
    PageServerData,
  } from "../../../../.svelte-kit/types/src/routes/(authenticated)/forum/$types";

  export let data: PageServerData;
</script>

<div
  class="block"
  style="width:100%;background-color: rgba(0, 0, 0, 0);height: 53px;"
/>

<h1>forum</h1>

<!-- Container for the textbar and forum secions  -->
<div class="messageContainer">
  <!-- Container -->
  <div class="messages">
    <div>
      <!-- title of web section -->
      <h1>Forums</h1>

      <!-- Form for title and first post comment -->
      <form
        use:enhance={({ form }) => {
          form.reset();
        }}
        method="post"
        class="form-container"
        action="?/posting"
      >
        <!-- Message -->
        <label for="msg"><b>Message</b></label>
        <!-- Input for title -->
        <input type="text" placeholder="Title" name="postTitle" required />
        <!-- post message -->
        <textarea placeholder="Type message.." name="msg" required />
        <!-- sends the form to server -->
        <button type="submit" class="btn">Send</button>
      </form>
    </div>
    <div>
      <!-- displays all avalible forums in database -->
      {#if data.formums}
        {#each data.formums as item}
          <p>
            <a style="color: #c7d5e0;" href={"/forums/" + item.id}
              >{item.postTitle}</a
            >
          </p>
        {/each}
      {/if}
    </div>
  </div>
</div>

<style>
  .messageContainer {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .messages {
    width: 600px;
    height: 500px;
    background-color: #2a475e;
    border: 5px outset #66c0f4;
  }
</style>
