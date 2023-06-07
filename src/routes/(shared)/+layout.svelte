
<head>
    <script src="https://kit.fontawesome.com/045c97b669.js" crossorigin="anonymous"></script>

</head>

<script lang="ts">
  import type { LayoutServerData } from "./$types";
  export let data: LayoutServerData;

  function myFunction() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }

  
</script>

<meta content="width=device-width, initial-scale=1" name="viewport" />
<meta name="viewport" content="width=device-width,initial-scale=1" />


<main style="height: 100vh; width:100%">
  <header class="head">
    <div class="topbar" />

    <nav class="topnav">
      <div class="desktop">
        <a class="active" href="/catalog">Catalog</a>

        {#if data?.userid}
          <a id="navChange" href="/settings">Settings</a>
        {:else}
          <a id="navChange" href="/login">Login</a>
          <a id="navChange" href="/register">Register</a>
        {/if}

        <a id="navChange" href="/info">Info</a>
        <a id="navChange" href="/support">Support</a>
      </div>
      <div class="mobile">
        <!-- Top Navigation Menu -->
        <div class="mob">
          <a class="active" href="/catalog">Catalog</a>
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <div class="icon" on:click={myFunction}>
            <i id="icon" class="fa-solid fa-bars" style="color: #666675;"></i>
          </div>
        </div>
        <div id="myLinks" style="display: none;">
          <div class="refs">
            {#if data?.userid}
              <a id="navChange" href="/settings">Settings</a>
            {:else}
              <a id="navChange" href="/login">Login</a>
              <a id="navChange" href="/register">Register</a>
            {/if}

            <a id="navChange" href="/info">Info</a>
            <a id="navChange" href="/support">Support</a>
          </div>
        </div>
      </div>
    </nav>
  </header>

  <slot />
</main>

<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Lato:wght@700&display=swap"
  rel="stylesheet"
/>

<style>
  :global(body) {
    background-color: #0b0b0d;
    margin: 0;
    padding: 0;
  }

  .head {
    position: fixed;
    width: 100%;
    z-index: 10000;
  }

  .topbar {
    width: 100%;
    height: 4px;
    background-color: #537fe7;
    box-shadow: rgba(243, 0, 0, 0.26) 0px 0px 2px 0px;
  }

  .topnav {
    overflow: hidden;
    background-color: #242429;
    box-shadow: 0 5px 16px 0 rgba(0, 0, 0, 0.5);
  }

  .topnav a {
    float: left;
    color: #f2f2f2;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 20px;
    margin-top: 0;
    font-family: lato;
  }

  .topnav a:hover {
    background-color: #303036;
    color: white;
  }

  .topnav a.active:hover {
    background-color: #537fe7;
    color: white;
  }
  .desktop {
    display: block;
  }

  .mobile {
    display: none;
    margin: auto;
    background-color: #242429;
    color: white;
    border-radius: 10px;
  }

  .mob {
    overflow: hidden;
    background-color: #242429;
    position: relative;
  }

  #myLinks {
    display: none;
    background-color: #18181c;
    width: 100%;
  }

  .refs {
    display: grid;
    grid-column: start;
  }

  .mob a {
    color: white;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 20px;
    display: block;
  }

  .icon {
    background-color: #45454f;
    display: flex;
    position: absolute;
    align-items:center;
    right: 0;
    width: 50px;
    height: 52px;
    top: 0;
    cursor: pointer;
  }

  #icon {
    margin:auto;
    font-size:20px;
  }

  .mob a:hover {
    background-color: #ddd;
    color: black;
  }

  @media screen and (max-width: 600px) {
    .mobile {
      display: block;
    }
    .desktop {
      display: none;
    }
  }
</style>
