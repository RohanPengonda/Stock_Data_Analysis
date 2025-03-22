import React, { useState } from "react";
import axios from "axios";
import "./Upload.css";

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const uploadFile = async () => {
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/upload",
        formData
      );
      setMessage(response.data);
      setTimeout(() => fetchImage(), 3000); // Wait for processing
    } catch (error) {
      setMessage("Error uploading file.");
    }
  };

  const fetchImage = () => {
    setImageUrl(
      `http://localhost:8080/api/trend-image?timestamp=${new Date().getTime()}`
    );
  };

  return (
    <div className="upload-container">
      <h1 className="text-h1">Upload Data (CSV)</h1>
      <label className="upload-label">
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      </label>
      <button className="upload-btn" onClick={uploadFile}>
        Upload & Analyze
      </button>
      <p className="message">{message}</p>
      {imageUrl && <img className="stock-image" src={imageUrl} alt="Data" />}
    </div>
  );
};

export default UploadFile;
