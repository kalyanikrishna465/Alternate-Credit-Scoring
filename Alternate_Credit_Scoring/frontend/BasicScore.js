import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Doughnut } from "react-chartjs-2";

const BasicScore = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    income: 50000,
    revenue: 200000,
    debt: 30000,
    credit_utilization: 50,
    loan_repayment: 90,
    business_age: 5,
    transaction_patterns: 75,
    growth_rate: 10,
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: parseFloat(e.target.value) });
  };

  // Real-time API call on input change (debounced)
  useEffect(() => {
    const fetchScore = async () => {
      setLoading(true);
      try {
        const response = await axios.post("http://127.0.0.1:8000/calculate_basic_score", formData);
        setResult(response.data);
      } catch (error) {
        console.error("❌ Error fetching score:", error);
      }
      setLoading(false);
    };

    // Debounce API requests
    const delayDebounce = setTimeout(() => {
      fetchScore();
    }, 500); // 500ms delay

    return () => clearTimeout(delayDebounce);
  }, [formData]); // Runs when formData changes

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Real-Time Financial Score</h2>

      {/* Form Section */}
      <div style={styles.formContainer}>
        {Object.keys(formData).map((key) => (
          <div key={key} style={styles.inputGroup}>
            <label style={styles.label}>{key.replace(/_/g, " ").toUpperCase()}:</label>
            <input type="number" name={key} value={formData[key]} onChange={handleChange} style={styles.input} />
          </div>
        ))}
      </div>

      {/* Loading Indicator */}
      {loading && <p style={styles.loadingText}>🔄 Calculating Score...</p>}

      {/* Results Section */}
      {result && !loading && (
        <div style={styles.resultContainer}>
          <h3 style={styles.scoreText}>Financial Score: {result.score}</h3>
          <p style={{ ...styles.riskText, color: result.risk_color }}>Risk: {result.risk_category}</p>

          {/* Doughnut Chart */}
          <div style={styles.chartContainer}>
            <Doughnut
              data={{
                labels: ["Score", "Remaining"],
                datasets: [{ data: [result.score, 100 - result.score], backgroundColor: ["#28a745", "#e0e0e0"] }],
              }}
              options={{ maintainAspectRatio: false }}
            />
          </div>

          {/* Next Button */}
          <button style={styles.nextButton} onClick={() => navigate("/psychometric-analysis")}>
            Next (Psychometric Test)
          </button>
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
  input: {
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
    backgroundColor: "#007bff",
    color: "white",
    padding: "12px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1.1em",
    fontWeight: "bold",
    marginTop: "20px",
    transition: "0.3s",
  },
};

export default BasicScore;
