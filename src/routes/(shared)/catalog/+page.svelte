<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData, PageServerData } from "./$types";
  import { fade } from "svelte/transition";
  export let form: ActionData;
  export let data: PageServerData;

  let addPord: boolean = false;
</script>

<link rel="preconnect" href="https://fonts.googleapis.com" />
<link
  href="https://fonts.googleapis.com/css2?family=Lato:wght@700&display=swap"
  rel="stylesheet"
/>
<div
  class="block"
  style="width:100%;background-color: rgba(0, 0, 0, 0);height: 53px;"
/>
{#if data?.userid}
  <button id="buttonAdd" on:click={() => console.log("reee")}>Add prod</button>
{/if}
<div class="main-container">
  <div class="container">
    <div class="grid-container">
      {#if data.product}
        {#each data.product as item}
          <div class="grid-item">
            <img
              class="grid-image"
              src="https://placeholder.pics/svg/200/fff/FF6E31/PlaceHolder"
              alt="https://placeholder.pics/svg/200/243763/FF6E31/PlaceHolder"
            />
            <p>
              <a style="color: #c7d5e0;" href={"/catalog/" + item.URL}
                >{item.prodName}</a
              >
            </p>
            <p>Price: {item.price} Kr</p>
          </div>
        {/each}
      {/if}
    </div>

    {#if addPord}
      <div class="overlay-overview" transition:fade={{ duration: 200 }}>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- DO NOT REMOVE COMMENT ABOVE -->
        <div class="overlay" on:click={() => (addPord = false)} />

        <div class="overlay-content">
          <form use:enhance method="POST" action="?/addProduct">
            <!-- Password and Username in take -->
            <input
              id="inputs"
              required
              type="text"
              name="title"
              placeholder="Title Name"
            />
            <input
              id="inputs"
              required
              type="number"
              name="price"
              autocomplete="off"
              placeholder="Price"
            />
            <textarea
              id="description"
              required
              maxlength="100"
              name="desc"
              rows="5"
              cols="50"
            />

            <h1>Custom Checkboxes</h1>
            <label class="container"
              >Tech
              <input type="checkbox" name="tech" />
              <span class="checkmark" />
            </label>
            <label class="container"
              >Tool
              <input type="checkbox" name="tool" />
              <span class="checkmark" />
            </label>
            <label class="container"
              >Medicin
              <input type="checkbox" name="medicin" />
              <span class="checkmark" />
            </label>
            <label class="container"
              >Misc
              <input type="checkbox" name="misc" />
              <span class="checkmark" />
            </label>

            <!-- Execute the POST action -->
            <button id="button">Put offer</button>

            {#if form?.message}
              <p>{form?.message}</p>
            {/if}
          </form>
        </div>
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

  .container {
    display: flex;
    justify-content: center;
    position: relative;
    margin-top: 50px;
  }

  #buttonAdd {
    background-color: limegreen;
    border: none;
    border-radius: 10px;
    width: 100px;
    height: 50px;
    font-family: "Lato";
    color: white;
    position: absolute;
    z-index: 2;
    filter: drop-shadow(0 0 0.1rem white);
  }

  #buttonAdd:hover {
    background-color: lime;
    cursor: pointer;
    filter: drop-shadow(0 0 0.12rem lime);
  }

  .overlay-overview {
    z-index: 50000;
  }

  .overlay-content {
    position: fixed;
    top: 25%;
    left: 25%;
    width: 50%;
    height: 50%;
    border-radius: 10px;
    font-family: lato;
    color: white;

    background-color: #242429;
    display: flex;
    align-items: center;
  }

  #description {
    resize: none;
  }

  .grid-container {
    position: absolute;
    display: grid;
    grid-template-rows: auto auto auto;
    gap: 50px;
    margin: 0 auto;
    position: relative;
  }
  .grid-item {
    background-color: #242429;
    width: 40vw;
    padding-top: 20px;
    border-radius: 10px;
    font-family: lato;
    color: white;
    font-size: 20px;
    text-align: center;
    border: 1px solid #303036;

    /* filter: drop-shadow(0 0 0.75rem #19376d); */
  }

  .grid-image {
    width: 150px;
    height: 150px;
    background-color: rebeccapurple;
  }

  /*  Overlay for adding new offers */

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    backdrop-filter: blur(5px);
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
  }
</style>
