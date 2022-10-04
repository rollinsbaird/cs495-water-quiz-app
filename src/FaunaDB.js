var faunadb = require("faunadb");
var q = faunadb.query;
var client = new faunadb.Client({
  secret: "fnAExq3aoUACU7GUHST3jhO7o1-2gWhhbwdWWk6U",
  endpoint: "https://db.fauna.com/",
});

var quizData = client.query(
  q.Get(q.Ref(q.Collection("Quizes"), "344152786005394002"))
);

// https://docs.fauna.com/fauna/current/drivers/javascript?lang=javascript

var data;

quizData.then(function(response) {
  console.log(response.data.questions); // Logs the ref to the console.
  data = response.data;
});

setTimeout(() => {
    console.log(data)    
}, 500);

// quizData
//     .then(console.log)

// var obj;
// .then (res => {obj = JSON.parse(res)})

// obj.then(console.log)

// function GetQuizData() {
//     return (client.query(
//         q.Get(q.Ref(q.Collection('Quizes'), '344152786005394002'))
//       )
//       .then((ret) => console.log(ret))
//       .catch((err) => console.error(
//         'Error: [%s] %s: %s',
//         err.name,
//         err.message,
//         err.errors()[0].description,
//     )));
// }
// var quizData;

// async function getData() {
//     try {
//         quizData = client.query(
//             q.Get(q.Ref(q.Collection('Quizes'), '344152786005394002'))
//         )
//         return quizData;
//     } catch(e) {
//         console.log(e);
//         throw(e);
//     }
// }

// function getQuiz() {
//     let data;
//     getData().then(result => {
//             data = result;
//             // console.log(result);
//         }).catch(err => {
//             // had error
//     })
//     console.log(data);
//     return data;
// }

// quizData = getQuiz();

// // quizData = getData().then();

// console.log(quizData);
// // var stuff = getData();
// // console.log(stuff);
// const getData = async() => {
//     const quizData = client.query(
//         q.Get(q.Ref(q.Collection('Quizes'), '344152786005394002'))
//     )

//     return quizData;
// }

// const quizData = getData()
//     .then(console.log)
//     // .then(res => quizData = res)
//     // .then(console.log(quizData))
// // const quizData = await getData();

// // promise
// //     .then(res => quizData = res)
// //     .resolve().then(console.log(quizData))
//     // .then(console.log(quizData))

// var quizQuestions = await quizData.data;

// console.log('Synchronus.sandwhich');

// console.log(quizQuestions);
