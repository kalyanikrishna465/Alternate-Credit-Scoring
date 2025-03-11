import React, { useState, useEffect } from "react";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useNavigate } from "react-router-dom"; // For navigation

ChartJS.register(ArcElement, Tooltip, Legend);

const NewsApi = () => {
  const [query, setQuery] = useState("Tesla"); // Default query (Changeable)
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // React Router navigation

  // Fetch news sentiment score
  const fetchNewsSentiment = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:8000/calculate_news_credit_score", { query });
      setResult(response.data);
    } catch (error) {
      console.error("Error fetching news sentiment score", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNewsSentiment();
  }, [query]); // Fetch when query changes

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>News Sentiment Credit Scoring</h2>

      {/* Search Input */}
      <div style={styles.inputGroup}>
        <label style={styles.label}>Company or Borrower Name:</label>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={styles.input}
          placeholder="Enter company name..."
        />
        <button style={styles.fetchButton} onClick={fetchNewsSentiment}>Fetch Sentiment</button>
      </div>

      {/* Loading Indicator */}
      {loading && <p style={styles.loadingText}>🔄 Analyzing News Sentiment...</p>}

      {/* Results Section */}
      {result && !loading && !result.error && (
        <div style={styles.resultContainer}>
          <h3 style={styles.scoreText}>News Sentiment Score: {result.news_sentiment_score}</h3>
          <p style={{ ...styles.riskText, color: result.risk_color }}>Risk: {result.risk_category}</p>

          {/* Doughnut Chart */}
          <div style={styles.chartContainer}>
            <Doughnut
              data={{
                labels: ["Sentiment Score", "Remaining"],
                datasets: [{ data: [result.news_sentiment_score, 100 - result.news_sentiment_score], backgroundColor: ["#28a745", "#e0e0e0"] }],
              }}
              options={{ maintainAspectRatio: false }}
            />
          </div>

          {/* Next Button (Navigates to Final Step) */}
          <button style={styles.nextButton} onClick={() => navigate("/final-step")}>Next</button>
        </div>
      )}

      {/* Error Handling */}
      {result?.error && <p style={styles.errorText}>⚠️ {result.error}</p>}
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
  inputGroup: {
    marginBottom: "20px",
  },
  label: {
    fontSize: "1em",
    fontWeight: "bold",
    color: "#555",
    display: "block",
    marginBottom: "5px",
  },
  input: {
    padding: "10px",
    fontSize: "1em",
    borderRadius: "5px",
    border: "1px solid #ccc",
    width: "80%",
    marginRight: "10px",
  },
  fetchButton: {
    padding: "10px 15px",
    fontSize: "1em",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#28a745",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },
  fetchButtonHover: {
    backgroundColor: "#218838",
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
  errorText: {
    fontSize: "1.1em",
    color: "red",
    marginTop: "20px",
  },
};

export default NewsApi;
