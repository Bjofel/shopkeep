<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData, PageServerData } from "./$types";
  import { fade } from "svelte/transition";
  export let form: ActionData;
  export let data: PageServerData;

  let addPord: boolean = false;

  let prod: boolean = true


  function swap() {
    prod = false
    addPord = true
  }

  function reverse() {
   prod = true
   addPord = false
  }
</script>

<link rel="preconnect" href="https://fonts.googleapis.com" />
<link
  href="https://fonts.googleapis.com/css2?family=Lato:wght@700&display=swap"
  rel="stylesheet"
/>
<!-- Makes sure nothing goes hidden behind the Nav menu Postion fixed -->
<div
  class="block"
  style="width:100%;background-color: rgba(0, 0, 0, 0);height: 53px;"
/>
<!-- If user signed in will display option to put up item for sale -->
{#if data?.userid}
  <!-- <a id="buttonAdd" href="/commercial">add Product</a> -->
  <!-- for some reason on:click decided to off itself... great -->
  <button id="buttonAdd" on:click={swap}>Add prod</button>
{/if}


<!-- Main wrapper -->
<div class="main-container">
  <!-- Wrapper for the item container -->
  <div class="container">
    <!-- Wrapper for the items -->
    {#if prod}
    <div transition:fade={{ duration: 200 }} class="grid-container">
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

    {/if}

    {#if addPord}
      <div class="overlay-overview" transition:fade={{ duration: 200 }}>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- DO NOT REMOVE COMMENT ABOVE -->
        <!-- This overlay functions as a way to go back to browse products when pressed -->
        <div class="overlay-blur" on:click={reverse} />

          <!-- the main con -->
        <div class="overlay-content">
          <form use:enhance method="POST" action="?/addProduct">

            <div class="section-container">
              <p>What is your product called?</p>
               <input class="fill-container"
              id="inputs"
              required
              type="text"
              name="title"
              autocomplete="off"
              placeholder="Product Name"
            />
            </div>
            
            <div class="section-container">
              <p>At what price do you value your product?</p>
              <input class="fill-container"
              id="inputs"
              required
              type="number"
              name="price"
              autocomplete="off"
              placeholder="Price"
            /></div>

            <div class="section-container">
              <p>Tell us about your product</p>
               <textarea
               class="fill-container"
              id="description"
              required
              maxlength="100"
              name="desc"
              rows="5"
              cols="50"
              placeholder="Write a short description"

            />
            </div>

           

            <!-- Too little time to implement proper categories-->
            <div class="section-container"><p>Choose categories that match your product</p>
            <div>

        
            <label class="cate"
              >Tech
              <input type="checkbox" name="tech" />
              <span class="checkmark" />
            </label>
            <label class="cate"
              >Tool
              <input type="checkbox" name="tool" />
              <span class="checkmark" />
            </label>
            <label class="cate"
              >Medicin
              <input type="checkbox" name="medicin" />
              <span class="checkmark" />
            </label>
            <label class="cate"
              >Misc
              <input type="checkbox" name="misc" />
              <span class="checkmark" />
            </label></div>
                </div>

            

            <!-- Execute the POST action -->
            <button class="prodButton">Put offer</button>

            
          </form>
          
        </div>
        <!-- if fuckups happens -->
            {#if form?.message}
            <div transition:fade="{{delay: 100, duration: 200}}"   class="error">
              <p>{form?.message}</p>

            </div>
            {/if}
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
  }

  #buttonAdd:hover {
    background-color: lime;
    cursor: pointer;
    filter: drop-shadow(0 0 0.12rem lime);
  }

  .overlay-overview {
    z-index: 50000;
    width: 100%;
    height: 100%;
  }

  .overlay-content {
    width: clamp(300px, 33%, 800px);
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    font-family: lato;
    color: white;
    background-color: #242429;
    display: flex;
    align-items: center;
  }

  .overlay-blur {
    z-index: -1;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(5px);
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
  }

  .cate {
    

  }
  .section-container {
        margin-left: 10px;
        font-family: lato ;
        color: white;

  }

  .fill-container {
    display: flex;
    align-items: center;
    background-color: #18181c;
    border-radius: 12px;
    border: 1px solid #ffffff1a;
    width: 90%;
    height: 50px;
    color: white;
    padding: 0, 12px;
    outline:none;
    font-weight: bold;
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
    margin: auto;
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
    border-radius: 10px;
    border-color: rgba(0, 0, 0, 0);
    box-shadow: 0 5px 16px 0 rgba(0, 0, 0, 0.5);
    margin-bottom: 20px;
  }
  .AddCart:hover {
    background-color: white;
    color: #040404;
    cursor: pointer;
  }

  .prodButton {
    background-color: #537fe7;
    border-style: solid;
    color: white;
    display: flex;
    padding: 5px;
    width: 25%;
    height: 10%;
    border-radius: 10px;
    border-color: rgba(0, 0, 0, 0);
    box-shadow: 0 5px 16px 0 rgba(0, 0, 0, 0.5);
    justify-content: center;
    margin: 10px auto 10px auto;
  }
  .prodButton:hover {
    background-color: white;
    color: #040404;
    cursor: pointer;
  }

  .error {
    position: fixed;
    font-family: lato;
    display: flex;
    margin: auto;
    background-color: red;
    color: white;
    padding-top: 5px;
    padding-bottom: 5px;
    border-radius: 10px;
    justify-content: center;
    text-align: center;
    width: 20%;
  }
</style>
