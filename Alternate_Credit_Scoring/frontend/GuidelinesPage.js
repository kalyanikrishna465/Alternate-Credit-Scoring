import React from 'react';

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

const rbiGuidelines = [
  {
    title: "Lending to MSME Sector",
    description: "Guidelines for banks on lending to MSMEs, emphasizing credit access and fair practices.",
    link: "https://www.rbi.org.in/scripts/BS_ViewMasDirections.aspx?id=11060"
  },
  {
    title: "Credit Information Reporting",
    description: "Standards for credit information reporting by financial institutions, ensuring data accuracy and compliance.",
    link: "https://www.rbi.org.in/scripts/NotificationUser.aspx?Id=12764"
  },
  {
    title: "Model Risk Management in Credit",
    description: "Guidelines on the management and validation of AI/ML models used in credit assessment.",
    link: "https://yourstory.com/2024/08/rbi-proposes-guidelines-to-regulate-credit-risk-models"
  },
  {
    title: "Alternative Data Usage in Credit Assessment",
    description: "Encouragement of alternative financial data for credit scoring, including cash flow, utility, and telecom data.",
    link: "https://www.rbi.org.in/scripts/PublicationsView.aspx?Id=22458"
  },
  {
    title: "Data Privacy and Security",
    description: "Regulations to protect customer data used in AI-driven credit assessments.",
    link: "https://www.rbi.org.in/scripts/BS_PressReleaseDisplay.aspx"
  }
];

const GuidelinesPage = () => {
  return (
    <div style={styles.main}>
      <div style={styles.heroSection}>
        <h1 style={styles.heroTitle}>RBI Guidelines</h1>
        <p style={styles.heroText}>Below are key RBI guidelines relevant to macro-finance businesses and AI-powered credit assessment systems.</p>
      </div>
      <div style={styles.featuresSection}>
        {rbiGuidelines.map((guideline, index) => (
          <div key={index} style={styles.featureBox}>
            <h2 style={styles.featureTitle}>{guideline.title}</h2>
            <p style={styles.featureText}>{guideline.description}</p>
            <a href={guideline.link} target="_blank" rel="noopener noreferrer" style={styles.button}>Read More</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuidelinesPage;
