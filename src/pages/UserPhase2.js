import React from "react";
import Navbar from "../components/Navbar";
import "./UserPhase2.css";

const App = () => {
  const startRecognition = () => {
    fetch("http://localhost:5010/recognize", { method: "POST" }) // Correct fetch statement
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const videoElement = document.getElementById("video");
        videoElement.src = "http://localhost:5010/video_feed";
        videoElement.style.display = "block";
        videoElement.style.opacity = 1;
      })
      .catch((error) => console.error("Error:", error));
  };
  
  const stopRecognition = () => {
    fetch("http://localhost:5010/stop_recognition", { method: "POST" }) // Correct fetch statement
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const videoElement = document.getElementById("video");
        videoElement.src = "";
        videoElement.style.opacity = 0;
        setTimeout(() => {
          videoElement.style.display = "none";
        }, 300);
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="user-phase2-container">
      <Navbar />
      <div className="user-phase2-content">
        <h1>User Phase 2</h1>
        <p>Welcome to User Phase 2!</p>

        <h1>Face Recognition App</h1>
        <button onClick={startRecognition}>Start Recognition</button>
        <button onClick={stopRecognition}>Stop Recognition</button>
        <div>
          <img id="video" alt="Video Feed" />
        </div>
      </div>
    </div>
  );
};

export default App;
