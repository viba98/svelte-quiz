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
      // numQ.set(numOfQuestions)
      // const parsedData = JSON.parse(data.data);
      // imData.set(parsedData);
      // await textQuiz(parsedData);
      console.log('reloading')
      reloadGame();
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

<body>
  <div id="quiz">
    <Header {title}/>
    <QuizProgress />
    <div id = "card">
      {#if $showStats && !$loading}
        <Modal on:close={() => showStats.set(false)}>
          <Result quizType = "text" />
        </Modal>
      {/if}
      {#if $loading}
        <InitialLoading />
      {:else}
        <div class="game" in:fade={{ duration: 1500 }}>
          <Quiz questionType = "text"  baseQuestion = ""/>
        </div>
      {/if}
    </div>
  </div>
</body>

<style>
  body{ 
    background-color: #EEECF5;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
  }

  #quiz{ 
    margin: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #card{
    background-color: white;
    border-radius: 40px;
    box-shadow: 0px 4px 28px rgba(105, 89, 234, 0.15);
    padding: 60px 120px;
    min-width: 60%;
    max-width: 60%;
  }
</style>
