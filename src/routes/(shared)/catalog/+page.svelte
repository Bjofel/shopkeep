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
<!-- Makes sure nothing goes hidden behind the menus Postion fixed -->
<div
  class="block"
  style="width:100%;background-color: rgba(0, 0, 0, 0);height: 53px;"
/>
<!-- If user signed in will display option to put up item for sale -->
{#if data?.userid}
  <a id="buttonAdd" href="/commercial">add Product</a>
  <!-- for some reason on:click decided to off itself... great -->
  <!-- <button id="buttonAdd" on:click={() => addPord == true}>Add prod</button> -->
{/if}
<!-- Main wrapper -->
<div class="main-container">
  <!-- Wrapper for the item container -->
  <div class="container">
    <!-- Wrapper for the items -->
    <div class="grid-container">
      <!-- If retrival fromb DB == true -->
      {#if data.product}
        <!-- Loops through item and creates an idividual Element for each -->
        {#each data.product as item}
          <!-- Picture placeholder serves no real benefit but hey less load while looking cool -->
          <div class="grid-item">
            <img
              class="grid-image"
              src="https://placeholder.pics/svg/200/fff/FF6E31/PlaceHolder"
              alt="https://placeholder.pics/svg/200/243763/FF6E31/PlaceHolder"
            />
            <!-- reference point to view the item on its own dedicated store place -->
            <p>
              <a class="item_name_ref" href={"/catalog/" + item.URL}
                >{item.prodName}</a
              >
            </p>
            <p>Price: {item.price} Kr</p>

            <!-- If user is logged in display option to add to cart -->
            {#if data?.userid}
              <!-- Button to add item to cart -->

              <button class="AddCart">Add To Cart</button>
            {/if}
          </div>
        {/each}
      {/if}
    </div>

    {#if addPord}
      <div class="overlay-overview" transition:fade={{ duration: 200 }}>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- DO NOT REMOVE COMMENT ABOVE -->
        <div class="overlay" on:keydown={() => (addPord = false)} />

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
    text-decoration: none;
    justify-content: center;
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
    width: clamp(300px, 80%, 800px);
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
    width: clamp(300px, 80%, 800px);

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

  .item_name_ref {
    text-decoration: none;
    color: #c7d5e0;
  }
  .item_name_ref:hover {
    text-decoration: underline;
    color: #0040d3;
  }

  .AddCart {
    background-color: #537fe7;
    border-style: solid;
    color: white;
    margin-top: 10px;
    padding: 5px;
    width: 25%;
    height: 10%;
    border-radius: 12px;
    border-color: rgba(0, 0, 0, 0);
    box-shadow: 0 5px 16px 0 rgba(0, 0, 0, 0.5);
    margin-bottom: 20px;
  }
  .AddCart:hover {
    background-color: white;
    color: #040404;
    cursor: pointer;
  }
</style>
