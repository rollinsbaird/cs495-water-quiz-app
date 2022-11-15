import React, { useState, useEffect } from "react";
import "./Leaderboard.css";
import SelectQuiz from "./SelectQuiz";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

const faunadb = require("faunadb");
const client = new faunadb.Client({
  secret: process.env.REACT_APP_DB_KEY,
  endpoint: "https://db.fauna.com/",
});
var q = faunadb.query;

class Player {
  constructor(name, score, timestamp) {
    this.name = name;
    this.score = score;
    this.ts = timestamp;
  }
}

function Leaderboard(props) {
  const [period, setPeriod] = useState(0);
  const [chooseQuiz, setChooseQuiz] = useState(false);
  const [highscores, setHighscores] = useState([]);

  const getHighscores = async (quizId) => {
    const re = new RegExp('(?<=")[^"]*\\d(?=")');
    const id = re.exec(quizId)[0];
    try {
      // https://docs.fauna.com/fauna/current/drivers/javascript?lang=javascript
      await client.query(
          q.Map(
            q.Paginate(q.Match(q.Index("getHighscore"), id)),
            q.Lambda("highscoreRef", q.Get(q.Var("highscoreRef")))
          )
        )
        .then(
          function (response) {
            setHighscores(response.data);
            console.log(highscores);
          },
          function () {
            console.log("Query failed!");
          }
        );
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getHighscores(props.quizId);
    console.log(highscores);
  }, []);

  const player1 = new Player("Thom", 0.6, 1668111318145);
  const player2 = new Player("Rollins", 0.8, 1667504479);
  const player3 = new Player("Sam", 0.7, 1668504479);

  const sortedPlayers = [player1, player2, player3].sort(
    (a, b) => b["score"] - a["score"]
  );
  for (let i = 0; i < sortedPlayers.length; i++) {
    let scorePercent =
      Math.trunc(sortedPlayers[i]["score"] * 100).toString() + "%";
    sortedPlayers[i]["scorePercent"] = scorePercent;
  }

  const handleClick = (e) => {
    setPeriod(e.target.dataset.id);
  };

  const players = between(sortedPlayers, period);

  const displayLeaderboard = () => {
    return (
      <div className="leaderboard">
        <header className="leaderboard-header">
          <EmojiEventsIcon className="trophy"></EmojiEventsIcon>
          <h1>Leaderboard</h1>
          <Box>
            <button
              onClick={handleClick}
              data-id="3600000"
              className="leaderboard-button">
              1 Hour
            </button>
            <button
              onClick={handleClick}
              data-id="0"
              className="leaderboard-button">
              All Time
            </button>
          </Box>
          <br></br>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 100 }} aria-label="customized table">
              <TableHead>
                <TableRow className="leaderboard-table-row">
                  <TableCell
                    className="leaderboard-table-cell-head"
                    align="center">
                    Name
                  </TableCell>
                  <TableCell
                    className="leaderboard-table-cell-head"
                    align="center">
                    Score
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {players.map((player) => (
                  <TableRow
                    key={player.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell
                      className="leaderboard-table-cell"
                      align="center">
                      {player.name}
                    </TableCell>
                    <TableCell
                      className="leaderboard-table-cell"
                      align="center">
                      {player.scorePercent}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <br></br>
          <button onClick={() => setChooseQuiz(true)} className="home-button">
            Home
          </button>
          <br></br>
        </header>
      </div>
    );
  };

  function between(data, between) {
    const currTime = new Date();
    const previous = new Date(currTime);
    console.log("prev " + previous.getTime() + " " + between);
    previous.setTime(previous.getTime() - (between + 1));

    let filter = data.filter((val) => {
      let userTime = new Date(val.ts);
      // eslint-disable-next-line eqeqeq
      if (between == 0) return val;
      return previous <= userTime && currTime >= userTime;
    });
    return filter;
  }

  const displayOptions = () => {
    return chooseQuiz ? <SelectQuiz /> : displayLeaderboard();
  };

  return <>{displayOptions()}</>;
}
export default Leaderboard;
