import React, { useState } from "react";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setError(null); // Clear error when a file is selected
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if no file is selected
    if (!file) {
      setError("Please select a file to upload."); // Set error message
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        "https://karbon-assignment-backend.onrender.com/probe",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();

      if (response.ok) {
        // Extract flags and format them
        const flags = data.flags || {};
        setResults({
          rule1: flags.BORROWING_TO_REVENUE_FLAG,
          rule2: flags.ISCR_FLAG,
          rule3: flags.TOTAL_REVENUE_5CR_FLAG,
        });
        setError(null);
      } else {
        setError(data.error);
        setResults(null);
      }
    } catch (error) {
      setError("An error occurred while uploading the file.");
      setResults(null);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "0 auto",
        backgroundColor: "#f0f0f0", // Light gray background
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
      }}
    >
      <h2 style={{ textAlign: "center", color: "#333" }}>
        Upload Financial Data
      </h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="file"
          accept=".json"
          onChange={handleFileChange}
          style={{
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            width: "calc(100% - 110px)", // Adjusting width for button
          }}
        />
        <button
          type="submit"
          style={{
            marginLeft: "10px",
            padding: "10px 15px",
            backgroundColor: "#007bff", // Bootstrap primary color
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          Submit
        </button>
      </form>
      {results && (
        <div
          style={{
            backgroundColor: "#1c1c1c", // Dark background for results
            padding: "15px",
            borderRadius: "5px",
          }}
        >
          <h2 style={{ color: "whitesmoke", textAlign: "center" }}>Result:</h2>
          <ul
            style={{
              listStyleType: "none",
              padding: "0",
              textAlign: "left",
              color: "whitesmoke",
            }}
          >
            <li style={{ padding: "5px 0" }}>
              Rule 1: Borrowing to Revenue Flag:{" "}
              <strong>{results.rule1}</strong>
            </li>
            <li style={{ padding: "5px 0" }}>
              Rule 2 (ISCR_FLAG): <strong>{results.rule2}</strong>
            </li>
            <li style={{ padding: "5px 0" }}>
              Rule 3 (TOTAL_REVENUE_5CR_FLAG): <strong>{results.rule3}</strong>
            </li>
          </ul>
        </div>
      )}

      {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
    </div>
  );
};

export default FileUpload;
