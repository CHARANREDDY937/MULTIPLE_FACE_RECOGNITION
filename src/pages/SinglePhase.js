
// import React, { useState } from "react";
// import axios from "axios";

// const SinglePhase = () => {
//   const [labelName, setLabelName] = useState("");

//   const handleAddStudent = async () => {
//     try {
//       if (!labelName) {
//         alert("Please enter a label name");
//         return;
//       }

//       // Call the Flask API to start capturing faces
//       const captureResponse = await axios.post("http://127.0.0.1:5000/capture_faces", {
//         label_name: labelName,
//         num_samples: 100, // Number of samples to collect
//       });
//       alert(captureResponse.data.message);

//       // Call the Flask API to start training the model
//       const trainResponse = await axios.post("http://127.0.0.1:5000/train_model");
//       alert(trainResponse.data.message);
//     } catch (error) {
//       console.error("Error adding student:", error);
//       alert("An error occurred while adding the student.");
//     }
//   };

//   return (
//     <div>
//       <h2>Add Student</h2>
//       <input
//         type="text"
//         value={labelName}
//         onChange={(e) => setLabelName(e.target.value)}
//         placeholder="Enter Student Name"
//       />
//       <button onClick={handleAddStudent}>Add Student</button>
//     </div>
//   );
// };

// export default SinglePhase;

import React, { useState } from "react";
import axios from "axios";

const SinglePhase = () => {
  const [labelName, setLabelName] = useState("");
  const [loading, setLoading] = useState(false); // State to track loading status

  const handleAddStudent = async () => {
    try {
      if (!labelName) {
        alert("Please enter a label name");
        return;
      }

      // Call the Flask API to start capturing faces
      const captureResponse = await axios.post("http://127.0.0.1:5000/capture_faces", {
        label_name: labelName,
        num_samples: 100, // Number of samples to collect
      });
      alert(captureResponse.data.message);

      // Set loading state to true while training the model
      setLoading(true);

      // Call the Flask API to start training the model
      const trainResponse = await axios.post("http://127.0.0.1:5000/train_model");
      
      // Set loading state to false after training is complete
      setLoading(false);

      alert(trainResponse.data.message);
    } catch (error) {
      console.error("Error adding student:", error);
      alert("An error occurred while adding the student.");
      setLoading(false); // Make sure to stop the loading state even if an error occurs
    }
  };

  return (
    <div>
      <h2>Add Student</h2>
      <input
        type="text"
        value={labelName}
        onChange={(e) => setLabelName(e.target.value)}
        placeholder="Enter Student Name"
      />
      <button onClick={handleAddStudent}>Add Student</button>

      {loading && (
        <div>
          <p>Training the model... Please wait.</p>
        </div>
      )}
    </div>
  );
};

export default SinglePhase;
