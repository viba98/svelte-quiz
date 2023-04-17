import { get, writable } from "svelte/store";
import {
  quiz,
  quizIndex,
  answerIndex,
  rowIndex,
  isPlaying,
  answers
} from "../store";

export let numberOfQuestions; //max is 12

export const numQ = writable(2);

numQ.subscribe(value => {
  numberOfQuestions = value;
  console.log("numOfQuestions", numberOfQuestions)
})

const defaultStreaks = [...Array(numberOfQuestions + 1).keys()].map((v) => {
  return { number: v, value: 0 };
});

if (typeof localStorage !== 'undefined' && localStorage.getItem("current-game") === null) {
  localStorage.setItem("current-game", JSON.stringify({ isPlaying: false }));
}

if (typeof localStorage !== 'undefined' && localStorage.getItem("stats") === null) {
  localStorage.setItem(
    "stats",
    JSON.stringify({
      nGames: 0,
      maxStreak: 0,
      lastStreak: 0,
      streaks: defaultStreaks,
      scores: [],
    })
  );
}

export let currentGame = JSON.parse(typeof localStorage !== 'undefined' && localStorage.getItem("current-game"));

export let stats = () => JSON.parse(typeof localStorage !== 'undefined' && localStorage.getItem("stats"));

export const updateGame = () => {
  console.log("updating game")
  const game = {
    quiz: get(quiz),
    quizIndex: get(quizIndex),
    answerIndex: get(answerIndex),
    rowIndex: get(rowIndex),
    isPlaying: get(isPlaying),
    answers: get(answers),
  };
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem("current-game", JSON.stringify(game));
  }
};

export const reloadGame = () => {
  quiz.set(currentGame.quiz);
  answerIndex.set(currentGame.answerIndex);
  rowIndex.set(currentGame.rowIndex + 1);
  quizIndex.set(currentGame.quizIndex);
  answers.set(currentGame.answers);
  isPlaying.set(currentGame.isPlaying);
};

export const setStats = () => {
  let { nGames, maxStreak, streaks, scores } = stats();
  const numberGames = nGames + 1;
  const lastAnswers = get(answers);
  const correctAnswers = lastAnswers.filter((obj) => obj.correct === true);
  const streak = correctAnswers.length;
  const newMaxStreak = Math.max(maxStreak, streak);
  const streaksCopy = [...streaks];
  const newStreaks = streaksCopy.map((p) =>
    p.number === streak ? { number: p.number, value: p.value + 1 } : p
  );
  const lastScore = streak / numberOfQuestions;
  const updatedScores = [...scores, lastScore];
  const updatedStats = {
    nGames: numberGames,
    lastStreak: streak,
    maxStreak: newMaxStreak,
    streaks: newStreaks,
    scores: updatedScores,
  };
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem("stats", JSON.stringify(updatedStats));
  }
};


export const getStats = () => {
  const { nGames, lastStreak, maxStreak, scores } = stats();
  let average = 0;
  if (scores.length >= 1) {
    average = scores.reduce((prev, curr) => prev + curr) / scores.length;
  }
  return { nGames, lastStreak, maxStreak, average };
};
