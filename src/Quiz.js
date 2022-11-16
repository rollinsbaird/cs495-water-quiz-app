import React, { useState, useEffect } from "react";
import { Skeleton } from "@mui/material";
// import styled from "styled-components";
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

function Quiz(props) {
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [displayQuestion, setDisplayQuestion] = useState(true);
  const [isLastQuestionFeedback, setIsLastQuestionFeedback] = useState(false);
  const [viewedPreview, setViewedPreview] = useState(false);
  const [feedbackImage, setFeedbackImg] = useState("");
  // const [username, setUsername] = useState("");

  const getData = async () => {
    try {
      // https://docs.fauna.com/fauna/current/drivers/javascript?lang=javascript
      client.query(q.Get(q.Ref(props.quizId))).then((res) => {
        setQuizData(res.data);
        setLoading(false);
      });
    } catch (e) {
      console.error(e);
    }
  };

  const saveScore = async (quizId, username, score) => {
    const re = new RegExp('(?<=")[^"]*\\d(?=")');
    const id = re.exec(quizId)[0];
    console.log(score);
    try {
      // https://docs.fauna.com/fauna/current/learn/cookbook/fql/basics/documents/create?lang=javascript
      client
        .query(
          q.Create(q.Collection("Highscores"), {
            data: { quizId: id, username: username, score: score },
          })
        )
        .then((res) => {
          console.log(res);
        });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getData();
  });

  const restartQuiz = () => {
    setScore(0);
    setShowScore(false);
    setCurrentQuestion(0);
    setHasAnswered(false);
    setIsLastQuestionFeedback(false);
    setDisplayQuestion(true);
    setViewedPreview(false);
  };

  const shareUrl = "https://hydrogenius.netlify.app/";
  const shareSubject = "Hey! I think you would really like this cool new game called Hydrogenius!";
  const shareBody =
    "This is HydroGenius, it is great! You should play this game.";
  const shareTitle = "This is HydroGenius, an interactive water quiz game!";
  const shareHashtags = ["HydroGenius", "WaterQuiz"];
  const shareQuote =
    "This is HydroGenius, it is great! You should play this game.";

  // const StyledInput = styled.input`
  //   display: block;
  //   margin: 20px 0px;
  //   border: 1px solid lightblue;
  // `;
  // function useInput() {
  //   function onChange(e) {
  //     setUsername(e.target.value);
  //   }
  //   return {
  //     username,
  //     onChange,
  //   };
  // }

  const QuizEndScreen = (score, numQuestions) => {
    return (
      // TODO: fix manual print of score for buttons
      <>
        <button onClick={() => saveScore(props.quizId,"Shark Boy", score["score"]/numQuestions)}>
          {"Save Score"}
        </button>
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
        <button
          className="close-preview"
          onClick={() => setViewedPreview(true)}>
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

  // https://mui.com/material-ui/react-skeleton/
  const loadingScreen = () => {
    return (
      <>
        <div className="quiz-section">
          <div className="question-section">
            <Skeleton
              classname="question-count-sk"
              variant="rounded"
              margin={20}
              width={334}
              height={26}
            />
            <div className="question-br"></div>
            <div classname="question-image-sk">
              <Skeleton
                variant="rectangular"
                width={167}
                height={119}
                margin-top={20}
              />
            </div>
            <div className="img-br"></div>
            <Skeleton
              classname="question-text-sk"
              variant="rounded"
              width={334}
              height={52}
            />
          </div>
          <div className="answer-section">
            <Skeleton
              className="answer-choices-sk"
              variant="rounded"
              width={366}
              height={39}
            />
            <div className="choices-br"></div>
            <Skeleton
              className="answer-choices-sk"
              variant="rounded"
              width={366}
              height={39}
            />
            <div className="choices-br"></div>
            <Skeleton
              className="answer-choices-sk"
              variant="rounded"
              width={366}
              height={39}
            />
            <div className="choices-br"></div>
            <Skeleton
              className="answer-choices-sk"
              variant="rounded"
              width={366}
              height={39}
            />
          </div>
        </div>
      </>
    );
  };

  const DisplayQuiz = () => {
    return showScore ? (
      <div className="display-score">
        You scored {score} out of {quizData.questions.length}
        {/* <NameForm /> */}
        {/* <StyledInput {...inputProps} placeholder="Type a username" /> */}
        {QuizEndScreen({ score }, quizData.questions.length)}
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
    );
  };

  // class NameForm extends React.Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = { value: "" };

  //     this.handleChange = this.handleChange.bind(this);
  //     this.handleSubmit = this.handleSubmit.bind(this);
  //   }

  //   handleChange(event) {
  //     this.setState({ value: event.target.value });
  //   }

  //   handleSubmit(event) {
  //     alert("A name was submitted: " + this.state.value);
  //     event.preventDefault();
  //   }

  //   render() {
  //     return (
  //       <form onSubmit={this.handleSubmit}>
  //         <input
  //           type="text"
  //           value={this.state.value}
  //           onChange={this.handleChange}
  //         />
  //       </form>
  //     );
  //   }
  // }

  return (
    <div className="Quiz">{loading ? loadingScreen() : DisplayQuiz()}</div>
  );
}

export default Quiz;
