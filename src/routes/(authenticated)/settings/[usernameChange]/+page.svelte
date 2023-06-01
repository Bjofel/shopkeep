<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData } from ".svelte-kit/types/src/routes/(authenticated)/settings/$types";
  import { each } from "svelte/internal";

  export let form: ActionData;
  export let data: PageServerData;
</script>

<div>
  <p>hello</p>

  {#if data?.active == true}
    <!-- Contianer for change request -->
    <form
      method="POST"
      action="?/changeRequest"
      use:enhance={({ form }) => {
        form.reset();
      }}
    >
      <input required name="username" autocomplete="off" />
      <button>Change Username</button>
    </form>
  {:else}
    <p>Username has been change successfully</p>
  {/if}

  {#if form?.message}
    <!-- In case something is wrong with the Username it will display a message here -->
    <p>{form?.message}</p>
  {/if}
</div>
