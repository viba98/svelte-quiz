<script lang="ts">
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import { textQuiz } from "../utilities/buildTextQuiz";
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
  export let title: string;

  export let numOfQuestions;

  const startGame = async () => {
    if (currentGame.isPlaying) {
      numQ.set(numOfQuestions)
      const parsedData = JSON.parse(data.data);
      imData.set(parsedData);
      await textQuiz(parsedData);
      // console.log('reloading')
      // reloadGame();
    } else {
      numQ.set(numOfQuestions)
      const parsedData = JSON.parse(data.data);
      imData.set(parsedData);
      await textQuiz(parsedData);
    }
  };

  onMount(() => {
    console.log('mounted')
    startGame();
  });
</script>


<div id="main" class= "bg-white">
  <Header {title}/>
  {#if $showStats && !$loading}
    <Modal on:close={() => showStats.set(false)}>
      <Result quizType = "text" />
    </Modal>
  {/if}

  {#if $loading}
    <InitialLoading />
  {:else}
    <div class="game" in:fade={{ duration: 1500 }}>
      <QuizProgress />
      <Quiz questionType = "text"  baseQuestion = ""/>
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
