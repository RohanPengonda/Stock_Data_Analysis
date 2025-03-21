import React, { useState } from "react";
import axios from "axios";

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

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
    } catch (error) {
      setMessage("Error uploading file.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-4">
      <h1 className="text-red-500 text-center font-semibold">
        Stock Analysis - Assignment
      </h1>
      <div
        className="flex flex-col justify-between
    px-1 py-4"
      >
        <input
          className="border p-1"
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button className="bg-red-200 p-1 border " onClick={uploadFile}>
          Upload & Analyze
        </button>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default UploadFile;
