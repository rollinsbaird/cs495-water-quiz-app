import React, { useState } from "react";
// import quizData from './question_jsons/sampleAlabamaQuiz.json';
import "./Quiz.css";
import {
  EmailShareButton,
  TwitterShareButton,
  FacebookShareButton,
  EmailIcon,
  TwitterIcon,
  FacebookIcon,
} from "react-share";

var faunadb = require("faunadb");
var q = faunadb.query;
var client = new faunadb.Client({
  secret: process.env.REACT_APP_DB_KEY,
  endpoint: "https://db.fauna.com/",
});

// https://docs.fauna.com/fauna/current/drivers/javascript?lang=javascript
var readDB = client.query(
  q.Get(q.Ref(q.Collection("Quizes"), "345511172699587151"))
);

var quizData;

readDB.then(function (response) {
  quizData = response.data;
});

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [displayQuestion, setDisplayQuestion] = useState(true);
  const [isLastQuestionFeedback, setIsLastQuestionFeedback] = useState(false);
  const [viewedPreview, setViewedPreview] = useState(false);
  const [feedbackImage, setFeedbackImg] = useState("");

  const restartQuiz = () => {
    setScore(0);
    setShowScore(false);
    setCurrentQuestion(0);
    setHasAnswered(false);
    setIsLastQuestionFeedback(false);
    setDisplayQuestion(true);
    setViewedPreview(false);
  };

  const shareUrl = "https://master--peaceful-kulfi-c5ff44.netlify.app";
  const shareSubject = "Hey friend! I have a wonderful new web-app for you!";
  const shareBody =
    "This is HydroGenius, it is great! You should play this game.";
  const shareTitle = "This is HydroGenius, an interactive water quiz game!";
  const shareHashtags = ["HydroGenius", "WaterQuiz"];
  const shareQuote =
    "This is HydroGenius, it is great! You should play this game.";

  const quizEndScreen = (score, numQuestions) => {
    return (
      // TODO: fix manual print of score for buttons
      <>
        <p>
          <FacebookShareButton
            quote={
              shareQuote +
              shareUrl +
              "\nI just scored a " +
              score["score"] +
              " out of " +
              quizData.questions.length +
              "on the " +
              quizData
            }
            hashtag={"#" + shareHashtags[0]}
            url={shareUrl}>
            <FacebookIcon size={40} round={true} />
          </FacebookShareButton>
          <TwitterShareButton
            title={
              "\nI just scored a " +
              score["score"] +
              " out of " +
              quizData.questions.length +
              " on the " +
              quizData.title +
              "!\n" +
              shareTitle +
              "\n"
            }
            hashtag={"#" + shareHashtags[0]}
            hashtags={shareHashtags}
            url={shareUrl}
            seperator={"\n"}>
            <TwitterIcon size={40} round={true} />
          </TwitterShareButton>
          <EmailShareButton
            subject={shareSubject}
            body={
              shareBody +
              "\nI just scored a " +
              score["score"] +
              " out of " +
              quizData.questions.length +
              " on the " +
              quizData.title +
              "!\n"
            }
            hashtag={"#" + shareHashtags[0]}
            url={shareUrl}
            seperator={"\n"}>
            <EmailIcon size={40} round={true} />
          </EmailShareButton>
        </p>
        <button onClick={() => restartQuiz()}>{"Restart Quiz"}</button>
      </>
    );
  };

  function checkURL(url) {
    return url.match(/\.(jpeg|jpg|gif|png|svg)$/) != null;
  }

  const hasImg = (url) => {
    if (checkURL(url)) {
      return (
        <img
          className="question-image"
          src={url}
          alt="associated with question"></img>
      );
    }
    return;
  };

  const displayQuestionOrPreview = (hasPreview) => {
    if (!hasPreview || viewedPreview) {
      return (
        <>
          <div className="quiz-section">
            <div className="question-section">
              <div className="question-count">
                Question {currentQuestion + 1}/{quizData.questions.length}
              </div>
              {hasImg(quizData.questions[currentQuestion].questionImage)}
              <div className="question-text">
                {quizData.questions[currentQuestion].questionText}
              </div>
            </div>
            <div className="answer-section">{displayChoicesOrFeedback()}</div>
          </div>
        </>
      );
    }
    return (
      <div className="preview-section">
        <div className="preview-title">
          {quizData.questions[currentQuestion].questionPreview.previewTitle}
        </div>
        {hasImg(
          quizData.questions[currentQuestion].questionPreview.previewImage
        )}
        <div className="preview-text">
          {quizData.questions[currentQuestion].questionPreview.previewText}
        </div>
        <button onClick={() => setViewedPreview(true)}>
          {"Start Question"}
        </button>
      </div>
    );
  };

  const displayChoicesOrFeedback = () => {
    if (isLastQuestionFeedback) {
      return (
        <div className="answer-feedback">
          {hasImg(feedbackImage)}
          <p>{feedbackMsg}</p>
          <button className="after-feedback" onClick={() => setShowScore(true)}>
            {"Complete Quiz"}
          </button>
        </div>
      );
    }
    if (hasAnswered) {
      return (
        <div className="answer-feedback">
          {hasImg(feedbackImage)}
          <p>{feedbackMsg}</p>
          <button
            className="after-feedback"
            onClick={() => setHasAnswered(false) & setDisplayQuestion(true)}>
            {"Next Question"}
          </button>
        </div>
      );
    } else {
      return (
        <div className="answer-choices">
          {quizData.questions[currentQuestion].answerChoices.map(
            (answerChoice) => (
              <button
                onClick={() =>
                  advanceQuestion(
                    answerChoice,
                    answerChoice.feedback.feedbackText,
                    answerChoice.feedback.feedbackImage
                  )
                }>
                {answerChoice.answerText}
              </button>
            )
          )}
        </div>
      );
    }
  };

  const advanceQuestion = (
    answerChoice,
    answerChoiceFeedback,
    answerChoiceFeedbackImage
  ) => {
    if (answerChoice.isCorrect) {
      setScore(score + 1);
    }
    setFeedbackMsg(answerChoiceFeedback);
    setFeedbackImg(answerChoiceFeedbackImage);
    setHasAnswered(true);
    setDisplayQuestion(false);
    // displayChoicesOrFeedback();

    if (displayQuestion) {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < quizData.questions.length) {
        setCurrentQuestion(nextQuestion);
        setViewedPreview(false);
      } else {
        setCurrentQuestion(nextQuestion);
        setIsLastQuestionFeedback(true);
      }
    }
  };

  return (
    <div className="Quiz">
      {showScore ? (
        <div className="display-score">
          You scored {score} out of {quizData.questions.length}
          {quizEndScreen({ score }, quizData.questions.length)}
        </div>
      ) : (
        <>
          {displayQuestion ? (
            displayQuestionOrPreview(
              quizData.questions[currentQuestion].questionPreview.hasPreview
            )
          ) : (
            <>{displayChoicesOrFeedback()}</>
          )}
        </>
      )}
    </div>
  );
}

export default Quiz;
