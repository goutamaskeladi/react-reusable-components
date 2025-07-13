import { useEffect, useState, useRef } from "react";

/*
  Create a timer component in React.js
  Decreases by 1 every second
  Starts on component mount
  Takes an initial value via props
  Stops when it reaches 0
  Include 'Stop Timer' button to stop manually
  Has the following data-testid attributes:
    Title: app-title
    Timer value: timer-value
    Stop button: stop-button
*/

// Note to clearInterval(intervalID) is required. If the parameter provided does not identify a previously established action,
// this method does nothing. This ID was returned by the corresponding call to setInterval(). So we need Ref to store ID.

const Timer = ({ initial }) => {
  const [count, setCount] = useState(initial);
  const timerRef = useRef(null); // To store the timerID and it doesn't refer any dom element.

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);
  };

  const stopTimer = (e) => {
    e?.preventDefault();
    clearInterval(timerRef.current);
  };

  useEffect(() => {
    startTimer();
    return stopTimer;
  }, []);

  return (
    <div>
      <h1 data-testid="app-title">Timer</h1>
      <h2 data-testid="timer-value">{count}</h2>
      <button data-testid="stop-button" onClick={stopTimer}>
        Stop Timer
      </button>
    </div>
  );
};

export default Timer;
