import * as React from 'react';
import { Grid, Box } from '@mui/material';
import NameCard from './Name_Card';
import { useState } from 'react';

const faunadb = require('faunadb');
const client = new faunadb.Client({
  secret: process.env.REACT_APP_DB_KEY,
  endpoint: "https://db.fauna.com/",
})

// const {
//   // Ref,
//   Paginate,
//   // Get,
//   Match,
//   Index,
//   // Create,
//   // Collection,
//   // Join,
//   // Call,
//   // Function: Fn,
// } = faunadb.query;

var q = faunadb.query;
var data;
client.query(
  q.Paginate(
    q.Match(
      q.Index("all_quizzes")
    )
  )
)
.then(
  function (response) {
    data = response.data;
    // console.log(data);
    // console.log(typeof(data));
    // return data;
    // console.log(Array.from(quizzes));
    // for (var i = 0; i < quizzes.length; i++){
    //   quizGridItems[i] = 
    //     <Grid item
    //       key={i}
    //       xs={2}
    //       sm={1}>
    //       <NameCard
    //         title={quizzes[i][0]}
    //         description={quizzes[i][1]}
    //         difficulty={quizzes[i][2]}
    //         tags={quizzes[i][3]} />
    //     </Grid>
    // }
  },
  function () {
    console.log("Query failed!");
  }
);

// xs, extra-small: 0px
// sm, small: 600px
// md, medium: 900px
// lg, large: 1200px
// xl, extra-large: 1536px

const GridStyles = {
  width: "100%",
  backgroundColor: "lightblue",
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
}

const SelectQuiz = () => {
  const [quizzes, setQuizzes] = useState(data);
  
  // quizzes = [
  //     ["Alabama Water Demo", "Alabama Quiz for Demo", 1, "rivers"],
  //     ["Alabama Water Demo", "Alabama Quiz for Demo", 1, "states"],
  //     ["Alabama Water Demo", "Alabama Quiz for Demo (update)", 1, "rivers"],
  //     ["Alabama Water Demo", "Alabama Quiz for Demo (update)", 1, "states"],
  //     ["Great Lakes Quiz", "Great Lakes Quiz", 1, "lakes"],
  //     ["Sample Quiz 2", "QUIZ_DESCRIPTION", 0, "INSERT_TAG_NAME"],
  //     ["TITLE_TO_DISPLAY", "QUIZ_DESCRIPTION", 0, "INSERT_TAG_NAME"]
  // ];

  return (
    <Box sx={{
      width: '100%',
      overflow: "auto",
    }}>
      <Grid container
        columns={{ xs: 2, md: 3, xl: 4 }}
        spacing={10}
        sx={GridStyles}>
        {Array.from(quizzes).map((quiz, index) => (
          <Grid item
            key={index}
            xs={2}
            sm={1}>
            <NameCard
              title={quiz[0]}
              description={quiz[1]}
              difficulty={quiz[2]}
              tags={quiz[3]} />
          </Grid>
        ))}
        {/* {Array.from(Array(6)).map((quiz, index) => (
            <Grid item
            key = {index}
            xs = {2}
            sm = {1}>
                <NameCard name={"Number " + index} />
            </Grid>
        ))} */}
      </Grid>
    </Box>
  );
}

export default SelectQuiz;