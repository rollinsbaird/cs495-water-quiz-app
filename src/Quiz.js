import React, { useState } from 'react';
// import quizData from './question_jsons/sampleAlabamaQuiz.json';
import './Quiz.css';
import {EmailShareButton,TwitterShareButton, FacebookShareButton, EmailIcon, TwitterIcon, FacebookIcon} from "react-share";

var faunadb = require("faunadb");
var q = faunadb.query;
var client = new faunadb.Client({
  secret: process.env.REACT_APP_DB_KEY,
  endpoint: "https://db.fauna.com/",
});

// https://docs.fauna.com/fauna/current/drivers/javascript?lang=javascript
var readDB = client.query(
  q.Get(q.Ref(q.Collection("Quizes"), "344152786005394002"))
);

var quizData;

readDB.then(function (response) {
  quizData = response.data;
  console.log(quizData);
});

function Quiz() {
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState("");

  const shareUrl = "https://master--peaceful-kulfi-c5ff44.netlify.app"
  const shareSubject = "Hey friend! I have a wonderful new web-app for you!"
  const shareBody = "This is HydroKids, it is great! You should play this game."
  const shareTitle = "This is HydroKids, an interactive water quiz game!"
  const shareHashtags = ["HydroKids","WaterQuiz"]
  const shareQuote = "This is HydroKids, it is great! You should play this game."

  const restartQuiz = () => {
    setScore(0);
    setShowScore(false);
    setCurrentQuestion(0);
    setHasAnswered(false);
  }

  const quizEndScreen = (score, numQuestions) => {
    return <p>
      <br></br>
      <FacebookShareButton
        quote = {shareQuote + shareUrl}
        hashtag = {'#' + shareHashtags[0]}
        url = {shareUrl}
    >
    <FacebookIcon size={40} round={true} />
  </FacebookShareButton>
      <TwitterShareButton
        title = {shareTitle}
        hashtags = {shareHashtags}
        url = {shareUrl}
        seperator = {'\n'}
    >
    <TwitterIcon size={40} round={true} />
  </TwitterShareButton>
    <EmailShareButton
      subject = {shareSubject}
      body = {shareBody}
      url = {shareUrl}
      seperator = {'\n'}
      >
      <EmailIcon size={40} round={true} />
    </EmailShareButton>
     </p>
  };

  const displayChoicesOrFeedback = () => {
    if(hasAnswered){
      return (
        <div className='answer-feedback'>
          <p>{feedbackMsg}</p>
          <button onClick={() => setHasAnswered(false)}>{"Next Question"}</button>
        </div>
      );
    }
    else{
      return (
        <div className='answer-choices'>
          {quizData.questions[currentQuestion].answerChoices.map((answerChoice) => (
            <button onClick={() => advanceQuestion(answerChoice, answerChoice.feedback.feedbackText)}>{answerChoice.answerText}</button>
            ))}
        </div>
      );
    }
  };

  const advanceQuestion = (answerChoice, answerChoiceFeedback) => {
    if (answerChoice.isCorrect) {
      setScore(score + 1);
    }

    setFeedbackMsg(answerChoiceFeedback);
    setHasAnswered(true);
    displayChoicesOrFeedback();
    

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData.questions.length) {
      setCurrentQuestion(nextQuestion)
    } else {
      setShowScore(true)
    }
  }

  return (
    <div className="Quiz">
      {showScore ? (
        <div className='display-score'>
          You scored {score} out of {quizData.questions.length}
          {quizEndScreen({score}, (quizData.questions.length))}
        </div>
      ) : (
        <>
          <div className='question-section'>
            <div className='question-count'>
              <span>Question {currentQuestion + 1}</span>/{quizData.questions.length}
            </div>
            <div className='question-text'>{quizData.questions[currentQuestion].questionText}</div>
          </div>
          <div className='answer-section'>
            {displayChoicesOrFeedback()}
          </div>
        </>
      )}
    </div>
  );
}

export default Quiz;
