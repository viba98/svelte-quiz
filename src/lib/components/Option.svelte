<script>
  export let opt, correct, answered, disabled, registeredAnswer;
  $: answeredClassName = correct ? "correct" : "wrong";
  $: answeredClass = answered ? answeredClassName : "";
  $: paintRight = disabled && correct ? "correct" : "";
  $: paintWrong = disabled && registeredAnswer ? "wrong" : "";
</script>

<div
  class="option {answeredClass} {paintRight} {paintWrong}"
  on:click
  class:disabled
>
  <span class="text">
    {opt}
  </span>
</div>

<style>
  .option {
    font-family: 'DM Sans';
    position: relative;
    cursor: pointer;
    border-radius: 1em;
    transition: all 0.2s ease-in-out;
    padding: 0.3em 0;
    width: 80%;
    max-width: 27em;
    height: auto;
    font-style: normal;
    font-weight: 500;
    font-size: 23px;
    line-height: 30px;
    margin: 0.5em 0;
  }

  .option:hover{
    background: rgba(105, 89, 234, 0.02);
    border: 1px solid rgba(105, 89, 234, 0.1);
  }

  .correct {
    background-color: rgb(89, 195, 100);
  }

  .wrong {
    background-color: rgb(200, 45, 81);
    animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    transform: translate3d(0, 0, 0);
  }

  .disabled {
    pointer-events: none;
  }

  .text {
    padding-left: 1rem;
  }
</style>
