<div
  class="block"
  style="width:100%;background-color: rgba(0, 0, 0, 0);height: 70px;"
/>

<link rel="preconnect" href="https://fonts.googleapis.com" />
<link
  href="https://fonts.googleapis.com/css2?family=Lato:wght@700&display=swap"
  rel="stylesheet"
/>

<div class="main-container">
  <div class="sub-container">
    <div class="sup-container">
      <p>What would you like to do?</p>
      <!-- Logout function -->

      <form method="POST" action="?/logout">
        <p>Log out of your current account</p>

        <button>LOGOUT</button>
      </form>

      <!-- account termination -->
      <form method="POST" action="?/deleteaccount">
        <p>Delete your current account</p>

        <button>DELETE ACCOUNT</button>
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
  .sup-container {
    height: 50%;
    margin-top: 10%;
    width: 50%;
  }

  .text {
    font-family: lato;
    color: white;
    font-size: 20px;
  }
  p {
    font-family: lato;
    color: white;
  }
</style>
