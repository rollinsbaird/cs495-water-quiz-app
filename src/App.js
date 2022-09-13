import React, { useState } from 'react';

function App() {
  const questions = [
    {
      questionText: 'Water ...?',
      answerChoices: [
        {answerText: "a", isCorrect: false},
        {answerText: "b", isCorrect: false},
        {answerText: "c", isCorrect: false},
        {answerText: "d", isCorrect: true},
      ],
    },
    {
      questionText: 'Is water wet?',
      answerChoices: [
        {answerText: "Yes", isCorrect: false},
        {answerText: "Yes", isCorrect: false},
        {answerText: "Yes", isCorrect: false},
        {answerText: "Yes", isCorrect: true},
      ],
    },
    {
      questionText: 'Rain ...?',
      answerChoices: [
        {answerText: "a", isCorrect: false},
        {answerText: "b", isCorrect: false},
        {answerText: "Precipitation", isCorrect: false},
        {answerText: "d", isCorrect: true},
      ],
    },
    {
      questionText: 'Flood?',
      answerChoices: [
        {answerText: "a", isCorrect: false},
        {answerText: "b", isCorrect: false},
        {answerText: "Noah's Ark", isCorrect: false},
        {answerText: "d", isCorrect: true},
      ],
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  const restartQuiz = () => {
    setScore(0);
    setShowScore(false);
    setCurrentQuestion(0);
  }

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
    <div className="App">
      {showScore ? (
        <div className='display-score'>
          You scored {score} out of {questions.length}
          <button onClick={restartQuiz}>Restart Quiz</button>
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

export default App;
