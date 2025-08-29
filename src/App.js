import React, { useState } from 'react';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [userName, setUserName] = useState('');
  const [started, setStarted] = useState(false);

  const questions = [
    {
      question: "What is 2 + 2?",
      answers: ["3", "4", "5", "6"],
      correct: 1
    },
    {
      question: "What color is the sky?",
      answers: ["Red", "Blue", "Green", "Yellow"],
      correct: 1
    },
    {
      question: "How many days in a week?",
      answers: ["6", "7", "8", "9"],
      correct: 1
    }
  ];

  const startQuiz = () => {
    if (userName.trim() !== '') {
      setStarted(true);
    }
  };

  const handleAnswer = (selectedAnswer) => {
    if (selectedAnswer === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setFinished(true);
    }
  };

  const restart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setFinished(false);
    setStarted(false);
    setUserName('');
  };

  // Start screen
  if (!started) {
    return (
      <div style={{
        padding: '50px',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f0f8ff',
        minHeight: '100vh'
      }}>
        <h1 style={{ color: '#4a90e2', fontSize: '3em' }}>🧠 My Quiz App</h1>
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
          <input
            type="text"
            placeholder="Enter your name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            style={{
              width: '100%',
              padding: '15px',
              fontSize: '18px',
              marginBottom: '20px',
              border: '2px solid #4a90e2',
              borderRadius: '8px'
            }}
          />
          <button
            onClick={startQuiz}
            style={{
              backgroundColor: '#4a90e2',
              color: 'white',
              padding: '15px 30px',
              fontSize: '20px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            🚀 Start Quiz
          </button>
        </div>
      </div>
    );
  }

  // Results screen
  if (finished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div style={{
        padding: '50px',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f0f8ff',
        minHeight: '100vh'
      }}>
        <h1 style={{ color: '#4a90e2' }}>🎉 Quiz Complete, {userName}!</h1>
        <div style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '15px',
          maxWidth: '400px',
          margin: '0 auto',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ color: '#333' }}>Your Score</h2>
          <p style={{ fontSize: '3em', margin: '10px', color: '#4a90e2' }}>
            {score}/{questions.length}
          </p>
          <p style={{ fontSize: '1.5em', color: '#666' }}>
            {percentage}% Correct!
          </p>
          <button
            onClick={restart}
            style={{
              backgroundColor: '#28a745',
              color: 'white',
              padding: '15px 30px',
              fontSize: '18px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              marginTop: '20px'
            }}
          >
            🔄 Try Again
          </button>
        </div>
      </div>
    );
  }

  // Quiz screen
  return (
    <div style={{
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f8ff',
      minHeight: '100vh'
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', color: '#4a90e2' }}>
          Quiz Time, {userName}! 🎯
        </h1>

        <div style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '15px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ color: '#333' }}>
            Question {currentQuestion + 1} of {questions.length}
          </h2>

          <h3 style={{
            fontSize: '1.3em',
            marginBottom: '30px',
            color: '#555'
          }}>
            {questions[currentQuestion].question}
          </h3>

          <div>
            {questions[currentQuestion].answers.map((answer, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                style={{
                  display: 'block',
                  width: '100%',
                  margin: '10px 0',
                  padding: '15px',
                  fontSize: '16px',
                  backgroundColor: '#e7f3ff',
                  border: '2px solid #4a90e2',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#4a90e2'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#e7f3ff'}
              >
                {answer}
              </button>
            ))}
          </div>

          <p style={{ marginTop: '20px', fontSize: '18px', color: '#666' }}>
            Current Score: {score} 🏆
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;