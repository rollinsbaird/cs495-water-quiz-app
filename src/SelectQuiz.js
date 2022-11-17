import * as React from "react";
import { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import NameCard from "./NameCard";
import HomeIcon from "@mui/icons-material/Home";
import "./NameCard.css";
import { motion } from "framer-motion";

const faunadb = require("faunadb");
const client = new faunadb.Client({
  secret: process.env.REACT_APP_DB_KEY,
  endpoint: "https://db.fauna.com/",
});
var q = faunadb.query;

const GridStyles = {
  width: "100%",
  backgroundColor: "252d4a",
  paddingRight: {
    xs: 10,
    sm: 10,
    md: 10,
    lg: 10,
    xl: 10,
  },
  paddingBottom: 10,
  marginTop: 0,
  marginLeft: "auto",
  marginRight: "auto",
};

const SelectQuiz = (props) => {
  const [quizzes, setQuizzes] = useState([]);

  const getData = async () => {
    try {
      // https://docs.fauna.com/fauna/current/drivers/javascript?lang=javascript
      await client.query(q.Paginate(q.Match(q.Index("all_quizzes2")))).then(
        function (response) {
          setQuizzes(response.data);
          console.log(response.data);
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

  return (
    <>
      <div className="spacerTop layer1"></div>
      <div className="select-body">
        <Box
          sx={{
            minWidth: "400px",
            width: "100%",
            overflow: "auto",
            display: "flow",
            flexDirection: "column",
          }}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              backgroundColor: "252d4a",
            }}>
            <motion.button
            style={{background: "transparent"}}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="home-button"
              onClick={props.toHomepage}>
              <HomeIcon className="home" sx={{ fontSize: "20px" }} />
            </motion.button>
          </Box>
          <Grid
            container
            columns={{ xs: 2, md: 3, xl: 4 }}
            spacing={10}
            sx={GridStyles}>
            {quizzes == null ? (
              <Grid item key={0} xs={2} sm={1}>
                <NameCard
                  title={""}
                  description={"No Quizzes"}
                  difficulty={""}
                  tags={""}
                />
              </Grid>
            ) : (
              Array.from(quizzes).map((quiz, index) => (
                <Grid item key={index} xs={2} sm={1}>
                  <NameCard
                    title={quiz[0]}
                    description={quiz[1]}
                    difficulty={quiz[2]}
                    // tags={quiz[3]}
                    quizId={quiz[3]}
                    toLeaderboard={props.toLeaderboard}
                  />
                </Grid>
              ))
            )}
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default SelectQuiz;
