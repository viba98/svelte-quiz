import { quiz, loading, isPlaying, reset2 } from "../store";
import { updateGame, numberOfQuestions } from "./repository";
import { shuffle } from "./helpers";

function createOptions(obj) {
  const image = obj.image
  const answer = obj.answer
  const wrongOp1 = obj.wrongOp1
  const wrongOp2 = obj.wrongOp2
  const wrongOp3 = obj.wrongOp3

  try {
    const wrongOptions = [
      { correct: false, opt: wrongOp1, imageUrl: image },
      { correct: false, opt: wrongOp2, imageUrl: image },
      { correct: false, opt: wrongOp3, imageUrl: image },
    ];

    const correctOption = {
      correct: true,
      opt: answer,
      imageUrl: image,
    };

    var orderedOptions = [...wrongOptions, correctOption]
    var options = shuffle(orderedOptions);
    return options;
    } catch (error) {
      console.error(`error while creating options: ${error}`);
      return { correctOption, wrongOptions: [] };
    }
}

const buildTextQuiz = async (data) => {
  let questionIndex = 0;
  try {
    while (questionIndex < numberOfQuestions) {
      const options = await createOptions(data[questionIndex]);
      const correctIndex = options.findIndex((option) => option.correct === true);
      const question = {
        options,
        image: options[1].imageUrl,
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
    console.trace();
    // reset2();
  }
};

export const textQuiz = async (data) => { 
  loading.set(true);
  await buildTextQuiz(data)
};