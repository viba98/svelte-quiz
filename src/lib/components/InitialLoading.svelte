<script>
  $: innerHeight = 0;
  $: innerWidth = 0;
  $: scale = innerWidth / 2;

  $: {
    if (innerWidth < 760) {
      scale = innerWidth;
    }
  }
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<div class="loading">
  <p>Starting the Quiz!</p>
</div>

<style>
 /* @media screen and (max-width: 768px) {
  p {
    margin-bottom: 3rem;
    font-size: 4.5rem;
  }
}

@media screen and (min-width: 768px) and (max-width: 1024px) {
  p {
    margin-bottom: 2rem;
    font-size: 4rem;
  }
}

@media screen and (min-width: 1024px) {
  p {
    margin-bottom: 1rem;
    font-size: 5rem;
  }
}

p {
  animation: flickerAnimation 2s infinite;
}

@keyframes flickerAnimation {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
} */

</style>
