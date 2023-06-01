<script lang="ts">
  import { enhance } from "$app/forms";
  import type { PageServerData } from ".svelte-kit/types/src/routes/$types";

  export let data: PageServerData;
</script>

<div
  class="block"
  style="width:100%;background-color: rgba(0, 0, 0, 0);height: 53px;"
/>
<p>hello User</p>

<form method="post">
  <input type="text" />
</form>
