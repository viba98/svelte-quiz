<script lang="ts">
    import { showStats } from "../store";
  export let title: string;
</script>

<header>
  <div class="header">
    <h1 id ="title">{title}</h1>
  </div>
  <div class="menu-right">
    <button on:click={() => showStats.set(true)}>  
      Score
    </button>
  </div>
</header>

<style>
  #title{
    font-family: 'DM Sans', sans-serif;;
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    color: #3D3D3D;
  }

  header {
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
    flex-wrap: nowrap;
    width: 75%;
    justify-content: space-between;
  }

  .header {
    flex-grow: 2;
    font-weight: 700;
    letter-spacing: 0.01em;
    text-align: center;
    left: 0;
    right: 0;
    pointer-events: none;
    position: relative;
  }

  button {
    pointer-events: all;
    cursor: pointer;
    border: none;
    transition: transform 0.5s ease-in-out;
    text-transform: uppercase;
    font-weight: 700;
    opacity: 0.4;
  }

  button:hover{ 
    opacity: 1;
  }
</style>
