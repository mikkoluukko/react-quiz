import React, {useState} from 'react';
import { fetchQuizQuestions } from './API';
// Components
import QuestionCard from './components/QuestionCard';
// Types
import { QuestionState } from './API';
// Styles
import { GlobalStyle, Wrapper } from './App.styles';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

// const TOTAL_QUESTIONS = 10;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [amount, setAmount] = useState(5);
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");

  // console.log(questions);

  const startTrivia = async () => {
    const newQuestions = await fetchQuizQuestions(
      amount,
      category,
      difficulty
    );

    if (newQuestions !== null) {
      setLoading(true);
      setGameOver(false);
  
      setQuestions(newQuestions);
      setScore(0);
      setUserAnswers([]);
      setNumber(0);
      setLoading(false);
    } else {
      alert("Not enough questions with these settings");
    }

  };
  
  const stopTrivia = async () => {
    setGameOver(true);
    setAmount(5);
    setCategory("");
    setDifficulty("");
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      // User's answer
      const answer = e.currentTarget.value;
      // Check answer against correct answer
      const correct = questions[number].correct_answer === answer;
      // Add score if answer is correct
      if (correct) setScore(prev => prev + 1);
      // Save answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        // Note to self, following ES6 syntax is same as "answer: answer", etc.
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers(prev => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    const nextQuestion = number + 1;

    if (nextQuestion === amount) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  const handleAmountChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setAmount(parseInt(e.currentTarget.value))
  };

  const handleCategoryChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setCategory(e.currentTarget.value)
  };

  const handleDifficultyChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setDifficulty(e.currentTarget.value)
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>REACT QUIZ</h1>
        {gameOver || userAnswers.length === amount ? (
          <div>
            <div>
              <select name="trivia_amount" onChange={handleAmountChange}>
                <option value="5">5 Questions</option>
                <option value="10">10 Questions</option>
                <option value="20">20 Questions</option>
              </select>
            </div>
            <div>
              <select name="trivia_category" onChange={handleCategoryChange}>
                <option value="">Any Category</option>
                <option value="category=9">General Knowledge</option>
                <option value="category=10">Entertainment: Books</option>
                <option value="category=11">Entertainment: Film</option>
                <option value="category=12">Entertainment: Music</option>
                <option value="category=13">Entertainment: Musicals &amp; Theatres</option>
                <option value="category=14">Entertainment: Television</option>
                <option value="category=15">Entertainment: Video Games</option>
                <option value="category=16">Entertainment: Board Games</option>
                <option value="category=17">Science &amp; Nature</option>
                <option value="category=18">Science: Computers</option>
                <option value="category=19">Science: Mathematics</option>
                <option value="category=20">Mythology</option>
                <option value="category=21">Sports</option>
                <option value="category=22">Geography</option>
                <option value="category=23">History</option>
                <option value="category=24">Politics</option>
                <option value="category=25">Art</option>
                <option value="category=26">Celebrities</option>
                <option value="category=27">Animals</option>
                <option value="category=28">Vehicles</option>
                <option value="category=29">Entertainment: Comics</option>
                <option value="category=30">Science: Gadgets</option>
                <option value="category=31">Entertainment: Japanese Anime &amp; Manga</option>
                <option value="category=32">Entertainment: Cartoon &amp; Animations</option>		
              </select>
            </div>
            <div>
              <select name="trivia_difficulty" onChange={handleDifficultyChange}>
                <option value="">Any Difficulty</option>
                <option value="difficulty=easy">Easy</option>
                <option value="difficulty=medium">Medium</option>
                <option value="difficulty=hard">Hard</option>
              </select>
            </div>            
              {/* <div>
                <button className="start" onClick={startTrivia}>
                  Start
                </button>
            </div> */}
          </div>
        ) : null}
        {gameOver || userAnswers.length === amount ? (
          <button className="start" onClick={startTrivia}>
            Start
          </button>
        ) : 
          null
        }
        {!gameOver ? 
            <span className="score">SCORE: {score}</span>
         : null}
        {loading && <p>Loading question...</p>}
        {!loading && !gameOver && (
          <QuestionCard 
            questionNr={number + 1}
            totalQuestions={amount}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}
        {!gameOver && 
        !loading && 
        userAnswers.length === number + 1 && 
        number !== amount - 1 ? (
          <button className="next" onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}
        {!gameOver && userAnswers.length !== amount ?
          <button className="stop" onClick={stopTrivia}>
            Reset
          </button>
        : null}
      </Wrapper>
    </>
  );
};

export default App;
