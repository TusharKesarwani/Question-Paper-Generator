const express = require("express");
const path = require("path");
const fs = require("fs");
// const bodyParser = require("body-parser");
const { readQuestions, writeQuestions } = require("./questions");

const app = express();
const port = 8000;

// app.use(bodyParser.json());
// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())
// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// Endpoint to the application
// app.get('/',(req, res) => {
//     const params = {};
//     res.status(200).send('index.pug',params);
// });

// Endpoint to get all questions
app.get("/questions", (req, res) => {
    const questions = readQuestions();
    res.json(questions);
    // const params = {questions};
    // res.status(200).send('questions.pug',params);
});

// Endpoint to add a new question
app.post("/questions", (req, res) => {
  const newQuestion = req.query;
  const questions = readQuestions();
//   console.log(newQuestion);
  questions.push(newQuestion);
  writeQuestions(questions);
  res.json({ message: "Question added successfully", question: newQuestion });
});

// Endpoint to generate a question paper
app.post("/generate-paper", (req, res) => {
  const { totalMarks, difficultyDistribution } = req.query;

  const questions = readQuestions();

  const questionPaper = generateQuestionPaper(questions,totalMarks,difficultyDistribution);

  res.json({ message: "Question paper generated successfully", questionPaper });
});

function generateQuestionPaper(questions, totalMarks, difficultyDistribution) {
  // Implemented the logic for generating the question paper

  const easyQuestions = questions.filter(question => question.difficulty === "Easy");
  const mediumQuestions = questions.filter(question => question.difficulty === "Medium");
  const hardQuestions = questions.filter(question => question.difficulty === "Hard");
  const numberOfEasyQuestions = ((Number(difficultyDistribution[1])*10+Number(difficultyDistribution[2]))*totalMarks)/500;
  const numberOfMediumQuestions = ((Number(difficultyDistribution[4])*10+Number(difficultyDistribution[5]))*totalMarks)/1000;
  const numberOfHardQuestions = ((Number(difficultyDistribution[7])*10+Number(difficultyDistribution[8]))*totalMarks)/1500;
  let questionPaper = [];
  for(let i = 0; i < numberOfEasyQuestions;i++){
    questionPaper.push(easyQuestions[(i%easyQuestions.length)]);
  }
  for(let i = 0; i < numberOfMediumQuestions;i++){
    questionPaper.push(mediumQuestions[(i%mediumQuestions.length)]);
  }
  for(let i = 0; i < numberOfHardQuestions;i++){
    questionPaper.push(hardQuestions[(i%hardQuestions.length)]);
  }
//   console.log(questionPaper);
  return questionPaper;
}

// Add error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

// START THE SERVER
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
