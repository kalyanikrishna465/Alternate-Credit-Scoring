import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate for routing
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PsychometricForm = () => {
  const navigate = useNavigate(); // ✅ Initialize navigation

  const [formData, setFormData] = useState({
    risk_tolerance: 60,
    financial_responsibility: 70,
    future_planning: 70,
    impulse_control: 80,
    loan_attitude: 60,
  });

  const [result, setResult] = useState(null);
  const [basicScore, setBasicScore] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedBasicScore = JSON.parse(localStorage.getItem("basicScore"));
    if (storedBasicScore) {
      setBasicScore(storedBasicScore);
    }
  }, []);

  // Fetch psychometric score when input changes (Real-time updates)
  useEffect(() => {
    const fetchScore = async () => {
      setLoading(true);
      try {
        const response = await axios.post("http://127.0.0.1:8000/calculate_psychometric_score", formData);
        setResult({ ...response.data, basic_score: basicScore?.score || 0 });
      } catch (error) {
        console.error("Error calculating score", error);
      }
      setLoading(false);
    };

    // Debounce API requests to avoid too many calls
    const delayDebounce = setTimeout(() => {
      fetchScore();
    }, 300); // 300ms delay

    return () => clearTimeout(delayDebounce);
  }, [formData, basicScore]);

  // Handle form updates
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: parseInt(e.target.value) });
  };

  // ✅ Handle "Next" button click - Navigate to NewsApi
  const handleNextClick = () => {
    navigate("/news-sentiment"); // ✅ Redirect to NewsApi.js
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Psychometric Credit Scoring</h2>

      {basicScore && (
        <p style={styles.basicScoreText}>
          🔹 Your Basic Score: <strong>{basicScore.score}</strong> ({basicScore.risk_category})
        </p>
      )}

      {/* Form Section */}
      <div style={styles.formContainer}>
        {Object.keys(formData).map((key) => (
          <div key={key} style={styles.inputGroup}>
            <label style={styles.label}>{key.replace(/_/g, " ").toUpperCase()}:</label>
            <select name={key} value={formData[key]} onChange={handleChange} style={styles.select}>
              <option value="40">Low</option>
              <option value="60">Medium</option>
              <option value="80">High</option>
            </select>
          </div>
        ))}
      </div>

      {/* Loading Indicator */}
      {loading && <p style={styles.loadingText}>🔄 Calculating Score...</p>}

      {/* Results Section */}
      {result && !loading && (
        <div style={styles.resultContainer}>
          <h3 style={styles.scoreText}>Psychometric Credit Score: {result.psychometric_score}</h3>
          <p style={{ ...styles.riskText, color: result.risk_color }}>Risk: {result.risk_category}</p>

          {/* Doughnut Chart */}
          <div style={styles.chartContainer}>
            <Doughnut
              data={{
                labels: ["Credit Score", "Remaining"],
                datasets: [{ data: [result.psychometric_score, 100 - result.psychometric_score], backgroundColor: ["#007bff", "#e0e0e0"] }],
              }}
              options={{ maintainAspectRatio: false }}
            />
          </div>

          {/* ✅ Next Button for Navigation */}
          <button style={styles.nextButton} onClick={handleNextClick}>Next</button>
        </div>
      )}
    </div>
  );
};

// ✅ Improved CSS Styling
const styles = {
  container: {
    textAlign: "center",
    padding: "95px",
    maxWidth: "600px",
    margin: "auto",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "1.8em",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#333",
  },
  basicScoreText: {
    fontSize: "1.2em",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#555",
  },
  formContainer: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "15px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
  },
  label: {
    fontSize: "1em",
    fontWeight: "bold",
    color: "#555",
    marginBottom: "5px",
  },
  select: {
    padding: "10px",
    fontSize: "1em",
    borderRadius: "5px",
    border: "1px solid #ccc",
    width: "100%",
  },
  loadingText: {
    fontSize: "1.1em",
    color: "#007bff",
    marginTop: "20px",
  },
  resultContainer: {
    marginTop: "30px",
  },
  scoreText: {
    fontSize: "1.5em",
    fontWeight: "bold",
  },
  riskText: {
    fontSize: "1.2em",
    fontWeight: "bold",
  },
  chartContainer: {
    width: "200px",
    height: "200px",
    margin: "auto",
  },
  nextButton: {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "1.2em",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },
  nextButtonHover: {
    backgroundColor: "#0056b3",
  },
};

export default PsychometricForm;
