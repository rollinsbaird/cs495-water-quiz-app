import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Grid, Box, Typography } from '@mui/material';
import NameCard from './Name_Card';

const faunadb = require('faunadb');
const client = new faunadb.Client({
    secret: process.env.REACT_APP_DB_KEY,
    endpoint: "https://db.fauna.com/",
})

const {
    // Ref,
    Paginate,
    // Get,
    Match,
    Index,
    // Create,
    // Collection,
    // Join,
    // Call,
    // Function: Fn,
} = faunadb.query;

// xs, extra-small: 0px
// sm, small: 600px
// md, medium: 900px
// lg, large: 1200px
// xl, extra-large: 1536px

const GridStyles = {
    width:"100%",
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
}

const SelectQuiz = () => {
    var quizzes;
    // var quizQuery = 
    // client.query(
    //     Paginate(
    //         Match(
    //             Index("all_quizzes")
    //         )
    //     )
    // )
    // .then(function (response) {
    //     quizzes = response.data;
    //     console.log(response.ref);
    // });

    quizzes = [
        ["Water Cycle Quiz", "Intro to Water Cycle Quiz", 1, "Water Cycle", "346051916186255951"],
        ["Alabama Water Demo", "Alabama Quiz for Demo (update)", 2, "rivers", "345437197101433425"],
        ["Great Lakes Quiz", "How much do you know about America's best lakes?", 3, "states", "345511172699587151"],
        ["Alabama Water Demo", "Alabama Quiz for Demo", 1, "states", "344801521082303056"],
        ["Properties of Water Quiz", "Molecular madness", 3, "chemistry", "344801521082303056"],
        ["TITLE TO DISPLAY", "QUIZ_DESCRIPTION", 4, "INSERT_TAG_NAME", "344152786005394002"],
    ];

    return(
        <Box sx={{
        width: '100%',
        overflow: "auto", 
        }}>
            <Grid container 
            columns={{ xs: 2, md: 3, xl: 4 }}
            spacing={10}
            sx={GridStyles}>
                {quizzes.map((quiz, index) => (
                    <Grid item
                    key = {index}
                    xs = {2}
                    sm = {1}>
                        <NameCard 
                        title={quiz[0]}
                        description={quiz[1]}
                        difficulty={quiz[2]}
                        tags={quiz[3]}
                        quizId={quiz[4]} />
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