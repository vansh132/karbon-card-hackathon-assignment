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
          mode: "no-cors",
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
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center" }}>Upload Financial Data</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input type="file" accept=".json" onChange={handleFileChange} />
        <button type="submit" style={{ marginLeft: "10px" }}>
          Submit
        </button>
      </form>
      {results && (
        <div
          style={{
            backgroundColor: "#000000FF",
            padding: "15px",
            borderRadius: "5px",
          }}
        >
          <h2 style={{ color: "whitesmoke" }}>Result:</h2>
          <ul
            style={{ listStyleType: "none", padding: "0", textAlign: "left" }}
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
