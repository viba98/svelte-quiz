<script>
  import { updateGame } from "../utilities/repository";
  import { fade } from "svelte/transition";
  import ImageQuestion from "./ImageQuestion.svelte";
  import Option from "./Option.svelte";
  import {
    quizIndex,
    answers,
    answerIndex,
    durationIn,
    quiz,
    autoNext,
  } from "../store";
    import TextQuestion from "./TextQuestion.svelte";

  export let index;
  export let image;
  export let options;
  export let answered;
  export let questionType;
  export let baseQuestion;

  let animationHeight = innerHeight;
  let animate = false;

  $: hasAnswered = answered;
  $: selectedOption = { breed: null, correct: null };
  $: innerWidth = 0;
  $: innerHeight = 0;
  $: isCorrect = null;
  $: positionY = 0;
  $: currentAnswer = $answers[$quizIndex] || { breed: null, correct: null };

  if (innerWidth > 760) {
    animationHeight = animationHeight * 1.1;
  }

  const answer = (e) => {
    hasAnswered = true;
    isCorrect = selectedOption.correct;
    $answers = [...$answers, selectedOption];
    quiz.update((items) => {
      const item = items[$quizIndex];
      item.answered = true;
      items[$quizIndex] = item;
      const newItems = [...items];
      return newItems;
    });
    const button = e.target;
    const rect = button.getBoundingClientRect();
    positionY = rect.top;
    answerIndex.update((n) => n + 1);
    updateGame();
    if (isCorrect) {
      animate = true;
    }
    autoNext();
  };
</script>

<svelte:window bind:innerWidth bind:innerHeight />

{#if $quizIndex === index}
  <div class="question" in:fade={{ duration: $durationIn }}>
    {#if questionType === "image"}
      <div class="image">
        <ImageQuestion image = {image} />
        <div class="center">
          <h3>{baseQuestion}</h3>
        </div>
      </div>
    {:else if questionType === "text"}
      <TextQuestion content = {image}/>
    {/if}
    
    {#each options as option}
      <Option
        {...option}
        on:click={(e) => {
          selectedOption = option;
          console.log(selectedOption)
          answer(e);
        }}
        answered={selectedOption.breed === option.breed && hasAnswered}
        disabled={hasAnswered}
        registeredAnswer={currentAnswer.breed === option.breed &&
          hasAnswered &&
          !currentAnswer.correct}
      />
    {/each}
  </div>
{/if}

<style>
  h3 {
    text-align: center;
    color: darkgray;
    font-size: 3.6em;
    margin: 0.5em;
  }

  .image {
    margin: 0 auto;
    display: block;
    margin: 1.5em;
    height: 30em;
    width: auto;
    max-width: 40em;
  }

  .question {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    height: 100%;
  }
</style>
