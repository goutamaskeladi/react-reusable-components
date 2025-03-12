import { useState, useEffect, useRef } from "react";

const WebWorkerComponent = () => {
  const [result, setResult] = useState(null);
  const [worker, setWorker] = useState(null);

  const inputRef = useRef();

  useEffect(() => {
    // Create a new Web Worker
    const myWorker = new Worker(new URL("../utils/worker.js", import.meta.url));
    // Save the worker instance to State
    setWorker(myWorker);
    // Set up event listener for messages from the worker
    myWorker.onmessage = function (event) {
      console.log("Received result from worker", event.data);
      // Set data to the state
      setResult(event.data);
    };
    // Clean up when component unmounts
    return () => {
      myWorker.terminate();
    };
  }, []); // Run this effect once when component mounts

  const handleClick = () => {
    // Send message to Web Worker to do calculation
    if (worker) {
      worker.postMessage(inputRef.current.value);
    }
  };
  return (
    <div>
      <input type="text" name="workerNumber" ref={inputRef} />
      <p>Result from the Worker: {result}</p>
      <button onClick={handleClick}>Calculate in Web Worker</button>
    </div>
  );
};

export default WebWorkerComponent;
