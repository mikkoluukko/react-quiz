import { shuffleArray } from './utils';

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export type QuestionState = Question & { answers: string[] };

export const fetchQuizQuestions = async (
  amount: number,
  category: string,
  difficulty: string
) => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&${category}&${difficulty}&type=multiple`;
  const data = await (await fetch(endpoint)).json();
  if (data.results.length === amount) {
    return data.results.map((question: Question) => (
      {
        ...question,
        answers: shuffleArray([
          ...question.incorrect_answers,
          question.correct_answer,
        ]),
      }
    ));
  } else {
    return null;
  }
  
};