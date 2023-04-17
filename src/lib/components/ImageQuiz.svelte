<script lang="ts">
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import { guessImage } from "../utilities/buildQuiz";
  import { currentGame, reloadGame, numQ } from "../utilities/repository";
  import { loading, showStats } from "../store";
  import Result from "./Result.svelte";
  import Quiz from "./Quiz.svelte";
  import InitialLoading from "./InitialLoading.svelte";
  import QuizProgress from "./QuizProgress.svelte";
  import Modal from "./Modal.svelte";
  import { imData } from "../store";
  import Header from "./Header.svelte";

  export let data: { data: string } ;
  export let baseQuestion: string;
  export let title: string = "Quiz";
  export let numOfQuestions;

  const startGame = async () => {
    if (currentGame.isPlaying) {
      console.log('reloading')
      reloadGame();
    } else {
      numQ.set(numOfQuestions)
      const parsedData = await JSON.parse(data.data);
      imData.set(parsedData);
      await guessImage(parsedData);
    }
  };

  onMount(() => {
    console.log('mounted' + title)
    startGame();
  });
</script>

<div id="main">
  <Header title={title}/>
  {#if $showStats && !$loading}
    <Modal on:close={() => showStats.set(false)}>
      <Result quizType = "image"/>
    </Modal>
  {/if}

  {#if $loading}
    <InitialLoading />
  {:else}
    <div class="game" in:fade={{ duration: 1500 }}>
      <QuizProgress />
      <Quiz questionType="image"  baseQuestion = {baseQuestion}/>
    </div>
  {/if}
</div>

<style>
  /* #main {
    text-align: center;
    padding-top: 0.5rem;
    height: 100%;
  } */
</style>
