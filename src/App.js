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
      questionText: 'What is the capital of France?',
      answerOptions: [
        { answerText: 'Berlin', isCorrect: false },
        { answerText: 'Madrid', isCorrect: false },
        { answerText: 'Paris', isCorrect: true },
        { answerText: 'Rome', isCorrect: false },
      ],
    },
    {
      questionText: 'Which planet is known as the Red Planet?',
      answerOptions: [
        { answerText: 'Venus', isCorrect: false },
        { answerText: 'Mars', isCorrect: true },
        { answerText: 'Jupiter', isCorrect: false },
        { answerText: 'Saturn', isCorrect: false },
      ],
    },
    {
      questionText: 'What is 2 + 2?',
      answerOptions: [
        { answerText: '3', isCorrect: false },
        { answerText: '4', isCorrect: true },
        { answerText: '5', isCorrect: false },
        { answerText: '6', isCorrect: false },
      ],
    },
    {
      questionText: 'Who painted the Mona Lisa?',
      answerOptions: [
        { answerText: 'Vincent van Gogh', isCorrect: false },
        { answerText: 'Pablo Picasso', isCorrect: false },
        { answerText: 'Leonardo da Vinci', isCorrect: true },
        { answerText: 'Michelangelo', isCorrect: false },
      ],
    },
    {
      questionText: 'What is the largest mammal?',
      answerOptions: [
        { answerText: 'Elephant', isCorrect: false },
        { answerText: 'Blue Whale', isCorrect: true },
        { answerText: 'Giraffe', isCorrect: false },
        { answerText: 'Hippopotamus', isCorrect: false },
      ],
    },
  ];

  const handleAnswerButtonClick = (isCorrect, answerText) => {
    setSelectedAnswer(answerText);

    const newAnswer = {
      question: questions[currentQuestion].questionText,
      selectedAnswer: answerText,
      correctAnswer: questions[currentQuestion].answerOptions.find(option => option.isCorrect).answerText,
      isCorrect: isCorrect
    };

    setUserAnswers([...userAnswers, newAnswer]);

    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setTimeout(() => {
        setCurrentQuestion(nextQuestion);
        setSelectedAnswer('');
      }, 1000);
    } else {
      setTimeout(() => {
        setShowScore(true);
      }, 1000);
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
    if (percentage >= 80) return "Excellent! 🎉";
    if (percentage >= 60) return "Good job! 👍";
    if (percentage >= 40) return "Not bad! 📚";
    return "Keep practicing! 💪";
  };

  return (
    <div className="app">
      <div className="quiz-container">
        <div className="quiz-header">
          <h1>🧠 Online Quiz App</h1>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${((currentQuestion + (showScore ? 1 : 0)) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {showScore ? (
          <div className="score-section">
            <div className="score-card">
              <h2>{getScoreMessage()}</h2>
              <div className="score-display">
                <span className="score-number">{score}</span>
                <span className="score-total">/ {questions.length}</span>
              </div>
              <p className="score-percentage">{Math.round((score / questions.length) * 100)}% Correct</p>

              <div className="answer-review">
                <h3>Review Your Answers:</h3>
                {userAnswers.map((answer, index) => (
                  <div key={index} className={`review-item ${answer.isCorrect ? 'correct' : 'incorrect'}`}>
                    <div className="question-number">Q{index + 1}</div>
                    <div className="review-content">
                      <p className="review-question">{answer.question}</p>
                      <p className="review-your-answer">
                        Your answer: <span>{answer.selectedAnswer}</span>
                      </p>
                      {!answer.isCorrect && (
                        <p className="review-correct-answer">
                          Correct answer: <span>{answer.correctAnswer}</span>
                        </p>
                      )}
                    </div>
                    <div className="review-icon">
                      {answer.isCorrect ? '✅' : '❌'}
                    </div>
                  </div>
                ))}
              </div>

              <button className="restart-button" onClick={resetQuiz}>
                🔄 Take Quiz Again
              </button>
            </div>
          </div>
        ) : (
          <div className="question-section">
            <div className="question-card">
              <div className="question-count">
                <span>Question {currentQuestion + 1}</span> / {questions.length}
              </div>
              <div className="question-text">
                {questions[currentQuestion].questionText}
              </div>
              <div className="answer-section">
                {questions[currentQuestion].answerOptions.map((answerOption, index) => (
                  <button
                    key={index}
                    className={`answer-button ${selectedAnswer === answerOption.answerText ? 'selected' : ''}`}
                    onClick={() => handleAnswerButtonClick(answerOption.isCorrect, answerOption.answerText)}
                    disabled={selectedAnswer !== ''}
                  >
                    <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                    {answerOption.answerText}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;