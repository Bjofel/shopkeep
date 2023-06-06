<div
  class="block"
  style="width:100%;background-color: rgba(0, 0, 0, 0);height: 70px;"
/>

<div class="main-container">
  <div class="sub-container">
    <div class="sup-container">
      <p class="text" style="text-align: center;font-size:25px;">
        Welcome to <b style="color:#537fe7;font-size:30px;">Shopkeep</b>
      </p>
      <p class="text">
        We are a market for the <b style="color:limegreen;">people</b>, by the
        <b style="color:limegreen;">people</b>
      </p>
      <p class="text">
        We allow anyone to post their own products on our <b
          style="color:orange;">marketplace</b
        >.
      </p>
      <p class="text">
        To being able to buy and sell products on our <b style="color:orange;"
          >market</b
        > we require an account
      </p>
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
</style>
