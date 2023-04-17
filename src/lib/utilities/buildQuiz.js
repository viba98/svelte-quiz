import { quiz, loading, isPlaying, reset } from "../store";
import { updateGame, numberOfQuestions } from "./repository";
import { shuffle, unslugify } from "./helpers";



const preload = async (src) => {
  const resp = await fetch(src);
  const blob = await resp.blob();

  return new Promise((resolve) => {
    let reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => resolve(reader.result);
  });
};

const buildOptions = (correctImageUrl, data) => {
  const allOptions = data;
  const answers = allOptions.map((img) => img.answer);
  shuffle(answers);
  const uniqoptions = [...new Set(answers)];
  const key = data.find((key) => key.image === correctImageUrl);
  const correctAnswer = key.answer;
  const wrongImages = uniqoptions
    .filter((answer) => answer !== correctAnswer)
    .splice(0, 3)
    .map((answer) => {
      return {
        answer,
        imageUrl: data.find((arr) => arr.answer === answer).img,
      };
    });
  const wrongOptions = wrongImages.map((img) => {
    return { correct: false, opt: img.answer, imageUrl: img.imageUrl };
  });
  const correctOption = {
    correct: true,
    opt: correctAnswer,
    imageUrl: correctImageUrl,
  };
  const orderedOptions = [...wrongOptions, correctOption];
  const options = shuffle(orderedOptions);
  return options;
};


const buildQuiz = async (data) => {
  let questionIndex = 0;
  
  try {
    const images = data.map((item) => item.image);
    const shuffledImages = shuffle(images);
    while (questionIndex < numberOfQuestions) {
      const [randomElement] = shuffledImages.splice(
        Math.floor(Math.random() * images.length),
        1
      );
      const question = {
        options: buildOptions(randomElement, data),
        image: await preload(randomElement),
        index: questionIndex,
        answered: false,
      };
      quiz.update((items) => {
        items.push(question);
        return items;
      });
      questionIndex += 1;
      isPlaying.set(true);
      loading.set(false);
    }
    updateGame();
  } catch (error) {
    console.error(`error while processing data: ${error}. retrying`);
    // reset();
  }
};

export const guessImage = async (data) => { 
  loading.set(true);
  await buildQuiz(data)
};
