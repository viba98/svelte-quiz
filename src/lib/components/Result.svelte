<script lang="ts">
  import { SvelteToast, toast } from "@zerodevx/svelte-toast";
  import { answers, reset, reset2, finished } from "../store";
  import { numberOfQuestions } from "../utilities/repository.js";
  import { copyTextToClipboard } from "../utilities/helpers";
  import Button from "./Button.svelte";
  import Statistics from "./Statistics.svelte";
    import { construct_svelte_component } from "svelte/internal";

  export let quizType: string;

console.log('showing results?')

  let theme = {
    "--toastBackground": "#ff7700",
    "--toastColor": "white",
    "--toastBarHeight": 0,
  };

  const clipboardText = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const url = window.location.href;
    const simpleUrl = url.replace(/(^\w+:|^)\/\//, "");
    copyTextToClipboard(simpleUrl);
    toast.push("Copied to ctrl + v!", { theme, duration: 1500 });
  };

  let correct = $answers.filter((el) => el.correct === true).length;
  let percentRight = correct / numberOfQuestions;

  let funText = "";
  if (percentRight < 0.2) funText = "Good Try! Maybe, try again?";
  if (percentRight >= 0.2 && percentRight < 0.6)
    funText = "A solid try";
  if (percentRight >= 0.6 && percentRight < 1)
    funText = "So close, but great job!";
  if (percentRight === 1) funText = "A perfect score!";
</script>

<div class="toast">
  <SvelteToast options={{ reversed: true, intro: { y: -198 } }} />
</div>

<div class="score">
  {#if $finished}
    <h3>
      You got {correct} out of {numberOfQuestions} correct!
    </h3>
    <p>{funText}</p>
  {/if}
  <Statistics />
  <div class="buttons">
    {#if $finished && quizType === "image"}
      <Button text="Play again" on:click={() => reset()} />
    {:else if $finished && quizType === "text"}
      <Button text="Play again" on:click={() => reset2()} />
    {/if}
    <Button text="Share" on:click={(e) => clipboardText(e)} />
  </div>
</div>

<style>
  :root {
    --toastContainerTop: 8rem;
    --toastContainerRight: auto;
    --toastContainerBottom: auto;
    --toastContainerLeft: calc(50% - 8rem);
  }

  .score {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #2a2550;
    max-width: 72rem;
    margin: 0 auto;
    border-radius: 0.5rem;
    width: 85%;
      font-size: 2rem;
      padding: 2rem;
  }

  h3 {
    text-align: center;
      font-size: 2.2rem;
  }

  p {
    text-align: center;
    font-size: 1.5rem;
    line-height: 3rem;
  }

  .buttons {
    display: flex;
    justify-content: space-around;
    max-width: 60rem;
    width: 100%;
  }

  .toast {
    z-index: 9999;
  }
</style>
