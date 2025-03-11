import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

function Contents() {
  const navigate = useNavigate(); // ✅ Hook for navigation

  return (
    <main style={styles.main}>
      <section style={styles.heroSection}>
        <h1 style={styles.heroTitle}>
          AI-Powered Credit Scoring for Smarter Lending Decisions
        </h1>
        
        <p style={styles.heroText}>
          InCREdiBIL analyzes businesses' creditworthiness using AI-driven insights
          and alternative financial data. Get real-time risk assessments and make 
          informed lending decisions with confidence.
        </p>

        <button 
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007BFF")}
          onClick={() => navigate("/basic-score")}  // ✅ Navigate to the correct page
        >
          Calculate your Credit Score
        </button>
      </section>

      {/* Key Features Section */}
      <section style={styles.featuresSection}>
        
        {/* Feature 1 */}
        <div style={styles.featureBox}>
          <img src="https://cdn-icons-png.flaticon.com/128/2910/2910768.png" 
               alt="AI Scoring" 
               style={styles.icon} />
          <h3 style={styles.featureTitle}>AI-Driven Scoring</h3>
          <p style={styles.featureText}>
            Uses machine learning to assess credit risks more accurately.
          </p>
        </div>

        {/* Feature 2 */}
        <div style={styles.featureBox}>
          <img src="https://cdn-icons-png.flaticon.com/128/1055/1055644.png" 
               alt="Real-time Insights" 
               style={styles.icon} />
          <h3 style={styles.featureTitle}>Real-Time Insights</h3>
          <p style={styles.featureText}>
            Get instant credit scores based on real-time financial behavior.
          </p>
        </div>

        {/* Feature 3 */}
        <div style={styles.featureBox}>
          <img src="https://cdn-icons-png.flaticon.com/128/2333/2333117.png" 
               alt="Risk Prediction" 
               style={styles.icon} />
          <h3 style={styles.featureTitle}>Risk Prediction</h3>
          <p style={styles.featureText}>
            Forecast potential loan defaults with AI-powered risk models.
          </p>
        </div>
        


      </section>
    </main>
  );
}

// ✅ Refactored Styles
const styles = {
  main: {
    padding: "60px",
    textAlign: "left",
    backgroundColor: "white",
    flex: "1",
  },
  heroSection: {
    marginBottom: "50px",
  },
  heroTitle: {
    color: "black",
    fontSize: "2.8em",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  heroText: {
    color: "#555",
    fontSize: "1.2em",
    lineHeight: "1.6",
    maxWidth: "800px",
  },
  button: {
    backgroundColor: "#007BFF",
    color: "white",
    padding: "14px 28px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "18px",
    fontWeight: "bold",
    marginTop: "25px",
    transition: "background 0.3s",
  },
  featuresSection: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginTop: "50px",
  },
  featureBox: {
    textAlign: "center",
    padding: "20px",
  },
  icon: {
    height: "50px",
  },
  featureTitle: {
    marginTop: "10px",
    fontSize: "1.5em",
  },
  featureText: {
    color: "#777",
    fontSize: "1em",
  },
};

export default Contents;
