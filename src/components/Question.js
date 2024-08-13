import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    // Function to handle the countdown
    function countdown() {
      setTimeRemaining((prevTime) => {
        if (prevTime === 1) {
          // When time runs out
          onAnswered(false);
          return 10; // Reset timer
        }
        return prevTime - 1; // Decrease time
      });
    }

    // Set up the timer
    const timerId = setInterval(countdown, 1000);

    // Clean up the timer when the component unmounts
    return () => clearInterval(timerId);
  }, [onAnswered]);

  function handleAnswer(isCorrect) {
    setTimeRemaining(10); // Reset timer when an answer is selected
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
