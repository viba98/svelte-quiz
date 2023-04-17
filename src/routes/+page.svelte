<script lang="ts">
import ImageQuiz from "../lib/components/ImageQuiz.svelte";
import TextQuiz from "../lib/components/TextQuiz.svelte";

const imageData: { data: string } = {"data": '[{"image": "https://images.dog.ceo/breeds/poodle-miniature/n02113712_3203.jpg", "breed": "poodle" },{"image": "https://images.dog.ceo/breeds/chihuahua/n02085620_2650.jpg", "breed": "chihuahua"},{"image": "https://images.dog.ceo/breeds/hound-walker/n02089867_3177.jpg", "breed": "hound-walker"},{"image": "https://images.dog.ceo/breeds/spaniel-welsh/n02102177_707.jpg", "breed": "spaniel-welsh"}]'};

// const imageData: { data: string } = {"data": '[{"image":"https://images.dog.ceo/breeds/poodle-miniature/n02113712_3203.jpg","breed":"idfk","wrongOp1":"poodle","wrongOp2":"fsdf sdf s","wrongOp3":"fsdfsd fsd"},{"image":"https://images.dog.ceo/breeds/chihuahua/n02085620_2650.jpg","breed":"chihuahua","wrongOp1":"fsdfsdfs","wrongOp2":"poodle","wrongOp3":"fsdfsdfsd"},{"image":"https://images.dog.ceo/breeds/hound-walker/n02089867_3177.jpg","breed":"hound-walker","wrongOp1":"fsdfsdfsdf","wrongOp2":"poodle","wrongOp3":"fsdfsdfsdfs"},{"image":"https://images.dog.ceo/breeds/spaniel-welsh/n02102177_707.jpg","breed":"spaniel-welsh","wrongOp1":"poofsdfsdfdle","wrongOp2":"fsdfsdfs fsd fsd ","wrongOp3":"fsdfsd fsd f "}]'};
</script>


<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="index,follow" />
    <title>Quiz Sample</title>

    <script async src="https://www.googletagmanager.com/gtag/js?id=G-P2FJLM58FS"
    ></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag("js", new Date());

      gtag("config", "G-P2FJLM58FS");
    </script>
  </head>
  <body class="game">
    <ImageQuiz data = {imageData} baseQuestion = "IDFK" title="Title"/>
    <!-- <TextQuiz data = {imageData} title="Title"/> -->
  </body>
</html>

<style>
  .game {
    display: flex;
    justify-content: flex-start;
    height: 100vh;
  }
</style>