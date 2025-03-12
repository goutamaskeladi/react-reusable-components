onmessage = function (event) {
  console.log("Recieved messge from main thread", event.data);
  // Perform some computation
  const result = event.data * 2;
  // Send the result back to main thread
  postMessage(result);
};
