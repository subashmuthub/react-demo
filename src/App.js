import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [userAnswers, setUserAnswers] = useState([]);

  const questions = [
    {
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correct: "Paris"
    },
    {
      question: "Which programming language is React built with?",
      options: ["Python", "JavaScript", "Java", "C++"],
      correct: "JavaScript"
    },
    {
      question: "What does HTML stand for?",
      options: ["Hypertext Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hypertext Machine Language"],
      correct: "Hypertext Markup Language"
    },
    {
      question: "Which company developed React?",
      options: ["Google", "Microsoft", "Facebook", "Amazon"],
      correct: "Facebook"
    },
    {
      question: "What is the largest planet in our solar system?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      correct: "Jupiter"
    }
  ];

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    const newAnswers = [...userAnswers, selectedAnswer];
    setUserAnswers(newAnswers);

    if (selectedAnswer === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedAnswer('');
    } else {
      setShowScore(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer('');
    setUserAnswers([]);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return { message: "Excellent! 🏆", color: "#4CAF50" };
    if (percentage >= 60) return { message: "Good Job! 👍", color: "#2196F3" };
    if (percentage >= 40) return { message: "Not Bad! 📚", color: "#FF9800" };
    return { message: "Keep Learning! 💪", color: "#F44336" };
  };

  if (showScore) {
    const scoreInfo = getScoreMessage();
    return (
      <div className="app">
        <div className="quiz-container">
          <div className="score-section">
            <h2>Quiz Complete!</h2>
            <div className="score-display" style={{ color: scoreInfo.color }}>
              <div className="score-number">{score}/{questions.length}</div>
              <div className="score-percentage">
                {Math.round((score / questions.length) * 100)}%
              </div>
              <div className="score-message">{scoreInfo.message}</div>
            </div>

            <div className="results-review">
              <h3>Review Your Answers:</h3>
              {questions.map((q, index) => (
                <div key={index} className="result-item">
                  <p className="result-question">{index + 1}. {q.question}</p>
                  <p className={`result-answer ${userAnswers[index] === q.correct ? 'correct' : 'incorrect'}`}>
                    Your answer: {userAnswers[index] || 'No answer'}
                    {userAnswers[index] !== q.correct && (
                      <span className="correct-answer"> (Correct: {q.correct})</span>
                    )}
                  </p>
                </div>
              ))}
            </div>

            <button onClick={resetQuiz} className="restart-btn">
              Take Quiz Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="quiz-container">
        <div className="quiz-header">
          <h1>Online Quiz Application</h1>
          <div className="progress">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
            <span className="question-count">
              Question {currentQuestion + 1} of {questions.length}
            </span>
          </div>
        </div>

        <div className="question-section">
          <div className="question-count-top">
            <span>Question {currentQuestion + 1}/{questions.length}</span>
          </div>
          <div className="question-text">
            {questions[currentQuestion].question}
          </div>
        </div>

        <div className="answer-section">
          {questions[currentQuestion].options.map((option, index) => (
            <div
              key={index}
              className={`answer-option ${selectedAnswer === option ? 'selected' : ''}`}
              onClick={() => handleAnswerSelect(option)}
            >
              <div className="option-letter">{String.fromCharCode(65 + index)}</div>
              <div className="option-text">{option}</div>
            </div>
          ))}
        </div>

        <div className="quiz-footer">
          <button
            onClick={handleNextQuestion}
            disabled={!selectedAnswer}
            className={`next-btn ${!selectedAnswer ? 'disabled' : ''}`}
          >
            {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;