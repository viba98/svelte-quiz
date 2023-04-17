import { quiz, loading, isPlaying, reset2 } from "../store";
import { updateGame, numberOfQuestions } from "./repository";
import { shuffle } from "./helpers";

function createOptions(obj) {
  console.log("creating option")
  const image = obj.image
  const breed = obj.breed
  const wrongOp1 = obj.wrongOp1
  const wrongOp2 = obj.wrongOp2
  const wrongOp3 = obj.wrongOp3

  try {
    const wrongOptions = [
      { correct: false, breed: wrongOp1, imageUrl: image },
      { correct: false, breed: wrongOp2, imageUrl: image },
      { correct: false, breed: wrongOp3, imageUrl: image },
    ];

    const correctOption = {
      correct: true,
      breed: breed,
      imageUrl: image,
    };

    var orderedOptions = [...wrongOptions, correctOption]
    var options = shuffle(orderedOptions);
    console.log("options", options)
    console.log("idk", correctOption, ...wrongOptions )
    // return [ ...wrongOptions, correctOption ];
    return options;
    } catch (error) {
      console.error(`error while creating options: ${error}`);
      return { correctOption, wrongOptions: [] };
    }
}

const buildTextQuiz = async (data) => {
  console.log('start builTextQuiz')
  let questionIndex = 0;
  try {
    while (questionIndex < numberOfQuestions) {
      const options = await createOptions(data[questionIndex]);
      console.log("options", options)
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