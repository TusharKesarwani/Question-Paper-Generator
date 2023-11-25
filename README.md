# Question Paper Generator

This is a simple web application for generating question papers based on specified criteria.

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the server: `npm start`

## Usage

### Endpoints

- GET `/questions`: Get all questions
- POST `/questions`: Add a new question
  - Example body: `{ "question": "What is the speed of light", "subject": "Physics", "topic": "Waves", "difficulty": "Easy", "marks": 5 }`
- POST `/generate-paper`: Generate a question paper
  - Example body: `{ "totalMarks": 100, "difficultyDistribution": { "Easy": 20, "Medium": 50, "Hard": 30 } }`

## Configuration

Adjust the difficulty distribution percentages in `config.json`.

## Project Structure

- `app.js`: Main application file
- `questions.js`: File storage and handling for questions
- `config.json`: Configuration file
- `questions.json`: File containing sample questions
- `README.md`: Documentation

