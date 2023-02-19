import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [recievedMessage, setRecievedMessage] = useState([]);
  const [message, setMessage] = useState([]);

  useEffect(() => {
    window.addEventListener("message", function (e) {
      if (e.origin !== "http://localhost:3000") return;
      setRecievedMessage(e.data);
    });
  }, []);

  const sendMessage = () => {
    window.parent.postMessage(message, "http://localhost:3000");
  };

  return (
    <div className="App">
      <h2>Child</h2>
      <div className="form">
        <input
          type="text"
          onBlur={(e) => setMessage([...message, e.target.value])}
        />
        <button onClick={sendMessage}>Send message to parent</button>
      </div>
      {recievedMessage?.map((msg, i) => (
        <p key={i}>{msg}</p>
      ))}
    </div>
  );
}

export default App;
