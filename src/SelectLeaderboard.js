import * as React from "react";
import { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import NameCard from "./NameCard";
import SelectQuiz from "./SelectQuiz";
import "./SelectLeaderboard.css";

const faunadb = require("faunadb");
const client = new faunadb.Client({
  secret: process.env.REACT_APP_DB_KEY,
  endpoint: "https://db.fauna.com/",
});
var q = faunadb.query;

// xs, extra-small: 0px
// sm, small: 600px
// md, medium: 900px
// lg, large: 1200px
// xl, extra-large: 1536px

const GridStyles = {
  width: "100%",
  backgroundColor: "#61dafb",
  paddingRight: {
    xs: 10,
    sm: 10,
    md: 10,
    lg: 10,
    xl: 10,
  },
  paddingBottom: 10,
  marginTop: 2,
  marginLeft: "auto",
  marginRight: "auto",
};

const SelectLeaderboard = () => {
  const [boards, setBoards] = useState([]);
  const [chooseQuiz, setChooseQuiz] = useState(false);

  const getData = async () => {
    try {
      // https://docs.fauna.com/fauna/current/drivers/javascript?lang=javascript
      await client.query(q.Paginate(q.Match(q.Index("all_quizzes2")))).then(
        function (response) {
            setBoards(response.data);
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
    getData();
  }, []);
  const displaySelectLeaderboard = () => {
    return(
      <Box
        sx={{
        width: "100%",
        overflow: "auto",
        }}>
        <Grid
        container
        columns={{ xs: 2, md: 3, xl: 4 }}
        spacing={10}
        sx={GridStyles}>
        {boards == null ? (
            <Grid item key={0} xs={2} sm={1}>
            <NameCard
                title={""}
                description={"No Leaderboards"}
                difficulty={""}
                tags={""}
            />
            </Grid>
        ) : (
            Array.from(boards).map((board, index) => (
            <Grid item key={index} xs={2} sm={1}>
                <NameCard
                title={board[0]}
                description={board[1]}
                difficulty={board[2]}
                // tags={board[3]}
                boardId={board[3]}
                />
            </Grid>
            ))
        )}
        </Grid>
        <br></br>     
        <button onClick={() => setChooseQuiz(true)} className="home-button">Home</button>
        <br></br>    
    </Box>
    );
}

  const displayOptions = () => {
    return (chooseQuiz) ? <SelectQuiz/> : displaySelectLeaderboard();
  }

  return (
    <>{displayOptions()}</>
  );
};

export default SelectLeaderboard;
