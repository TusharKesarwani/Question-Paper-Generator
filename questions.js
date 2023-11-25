const fs = require('fs');
const path = require('path');

const questionsFilePath = path.join(__dirname, 'questions.json');

function readQuestions() {
  const data = fs.readFileSync(questionsFilePath, 'utf-8');
  return JSON.parse(data);
}

function writeQuestions(questions) {
  fs.writeFileSync(questionsFilePath, JSON.stringify(questions, null, 2));
}

module.exports = { readQuestions, writeQuestions };
