<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData } from "./$types";

  export let form: ActionData;
</script>

<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Lato:wght@700&display=swap"
  rel="stylesheet"
/>
<div
  class="block"
  style="width:100%;background-color: rgba(0, 0, 0, 0);height: 53px;"
/>

<!-- Sends information to +page.Server.ts -->
<div class="main-container">
  <div class="sub-container">
    <div class="form-container">
      <form use:enhance method="POST" action="?/login">
        <!-- Password and Username in take -->
        <p class="text">Username</p>

        <div class="fill-container">
          <input
            id="inputs"
            required
            type="text"
            name="username"
            placeholder="Username"
          />
        </div>
        <p class="text">Password</p>

        <div class="fill-container">
          <input
            id="inputs"
            required
            type="password"
            name="password"
            autocomplete="off"
            placeholder="Password"
          />
        </div>

        <!-- Execute the POST action -->
        <button id="button">LOGIN</button>

        {#if form?.message}
          <p>{form?.message}</p>
        {/if}
      </form>
    </div>
  </div>
</div>

<style>
  .main-container {
    min-width: 0;
    min-height: 0;
    overflow: hidden;
  }

  .sub-container {
    background-color: #242429;
    width: clamp(300px, 32.5%, 900px);
    height: 500px;
    border-radius: 12px;
    box-shadow: 0 5px 16px 0 rgba(0, 0, 0, 0.5);
    /* Center hor */
    margin: 4% auto;
    display: flex;
    /* columns the form */
    flex-direction: column;

    align-items: center;
  }
  .form-container {
    height: 50%;
    margin-top: 10%;
    width: 50%;
  }

  .fill-container {
    display: flex;
    align-items: center;
    background-color: #18181c;
    border-radius: 12px;
    border: 1px solid #ffffff1a;
    width: 100%;
    height: 50px;
    padding: 0, 12px;
  }

  .fill-container:focus {
    border: 1px solid white;
  }
  #inputs {
    background-color: #24242900;
    font-family: lato;
    margin-left: 20px;
    height: 20px;
    width: 100%;
    border: none;
    color: white;
    outline: none;
  }

  .text {
    font-family: lato;
    color: white;
    font-size: 17px;
  }

  #button {
    background-color: #537fe7;
    border-style: solid;
    color: white;
    margin-top: 20px;
    padding: 5px;
    width: 100%;
    height: 50%;
    border-radius: 12px;
    border-color: rgba(0, 0, 0, 0);
    box-shadow: 0 5px 16px 0 rgba(0, 0, 0, 0.5);
  }
  #button:hover {
    background-color: white;
    color: #040404;
    cursor: pointer;
  }
</style>
