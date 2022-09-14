import React, { useState } from 'react';
import questions from './question_jsons/question.json';

function Quiz() {
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  const restartQuiz = () => {
    setScore(0);
    setShowScore(false);
    setCurrentQuestion(0);
  }

  const quizEndScreen = ({score}, {numQuestions}) => {
    if (score < 2) {
      return <button onClick={restartQuiz}>Restart Quiz</button>
    } else {
      // TO DO: make onCLick go to home page
      return <button onClick={restartQuiz}>Home Menu</button>
    }
  };

  const handleAnswerChoice = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion)
    } else {
      setShowScore(true)
    }
  }

  return (
    <div className="Quiz">
      {showScore ? (
        <div className='display-score'>
          You scored {score} out of {questions.length}
          {quizEndScreen({score}, (questions.length))}
        </div>
      ) : (
        <>
          <div className='question-section'>
            <div className='question-count'>
              <span>Question {currentQuestion + 1}</span>/{questions.length}
            </div>
            <div className='question-text'>{questions[currentQuestion].questionText}</div>
          </div>
          <div className='answer-section'>
            {questions[currentQuestion].answerChoices.map((answerChoice) => (
                <button onClick={() => handleAnswerChoice(answerChoice.isCorrect)}>{answerChoice.answerText}</button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Quiz;
