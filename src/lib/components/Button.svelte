<script lang="ts">
  export let text: string;
</script>

<button on:click>
  {text}
</button>

<style>
  button,
  button:link,
  button:visited {
    color: white;
    border: 0.2rem solid #ff7700;
    background: #ff7700;
    text-decoration: none;
    font-weight: bold;
    display: inline-block;
    transition: all 0.2s;
    position: relative;
    white-space: nowrap;
    text-align: center;
    cursor: pointer;
      min-width: 12rem;
      font-size: 1.4rem;
      padding: 0.8rem 0.8rem;
      border-radius: 0.8rem;
  }

  button:active {
    transform: translateY(-1px);
  }

  button::after {
    content: "";
    display: inline-block;
    height: 100%;
    width: 100%;
    border-radius: 10rem;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    transition: all 0.4s;
  }
</style>
