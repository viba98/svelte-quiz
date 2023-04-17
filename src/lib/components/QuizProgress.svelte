<script>
  import { quizIndex, answers, answerIndex, rowIndex } from "../store";
  import { numberOfQuestions } from "../utilities/repository.js";

  $: rightAnswer = (row) => {
    if (row <= $answerIndex) {
      return $answers[row].correct ? "right" : "wrong";
    }
    return "";
  };

  function goTo(row) {
    if (row <= $answerIndex) {
      rowIndex.set(row);
      quizIndex.update((_) => row);
    }
  }
</script>

<div class="progress-container">
  <div class="steps">
    {#each Array(numberOfQuestions) as _, row}
      <div
        class:current={row === $quizIndex}
        class="step {rightAnswer(row)}"
        on:click={() => goTo(row)}
        on:keypress={() => goTo(row)}
      />
    {/each}
  </div>
</div>

<style>
  .progress-container {
    left: 0;
    width: 75%;
    height: 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0 8px 8px 8px;
  }

  .steps {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    height: 100%;
    width: 100%;
    margin: 0 0.1rem;
  }

  .step {
    border-radius: 0.375em;
    width: 100%;
    height: 100%;
    margin: 0 0.125em;
    background-color: rgba(244, 245, 249, 0.4);
  }

  .current {
    transition: all 0.25s ease-in-out;
    background: #6959EA;
opacity: 0.2;
    cursor: pointer;
  }

  .right {
    background: #6959EA;
    cursor: pointer;
  }

  .wrong {
    background: #6959EA;
    cursor: pointer;
  }
</style>
