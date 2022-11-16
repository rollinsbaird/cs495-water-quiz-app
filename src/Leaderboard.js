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
  const [players, setPlayers] = useState([]);

  const getHighscores = async (quizId) => {
    try {
      // https://docs.fauna.com/fauna/current/drivers/javascript?lang=javascript
      await client
        .query(q.Paginate(q.Match(q.Index("all_Hs_by_Id"), quizId)))
        .then(
          function (response) {
            setHighscores(response.data);
            console.log(highscores);
            sortPlayers();
          },
          function () {
            console.log("Query failed!");
          }
        );
    } catch (e) {
      console.error(e);
    }
  };

  var sortedPlayers = [];
  // var players;

  const sortPlayers = () => {
    highscores.forEach((playerData) => {
      sortedPlayers.push(
        new Player(playerData[0], playerData[1], playerData[2])
      );
    });
    sortedPlayers = sortedPlayers.sort((a, b) => b["score"] - a["score"]);
    for (let i = 0; i < sortedPlayers.length; i++) {
      let scorePercent =
        Math.trunc(sortedPlayers[i]["score"] * 100).toString() + "%";
      sortedPlayers[i]["scorePercent"] = scorePercent;
    }
    setPlayers(between(sortedPlayers, period));
    console.log(players);
  };

  useEffect(() => {
    getHighscores(props.quizId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (e) => {
    setPeriod(e.target.dataset.id);
  };

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
                {players === [] ? (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell
                      className="leaderboard-table-cell"
                      align="center">
                      loading
                    </TableCell>
                    <TableCell
                      className="leaderboard-table-cell"
                      align="center"></TableCell>
                  </TableRow>
                ) : (
                  players.map((player) => (
                    <TableRow
                      key={player.name}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}>
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
                  ))
                )}
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
