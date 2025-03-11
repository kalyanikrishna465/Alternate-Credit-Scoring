import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Text from "./components/Text";
import Contents from "./components/Contents";
import PsychometricForm from "./components/PsychometricForm";
import BasicScore from "./components/BasicScore";
import NewsApi from "./components/Newsapi";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Default Landing Page */}
        <Route
          path="/"
          element={
            <div style={styles.landingContainer}>
              <Text />
              <Contents />
            </div>
          }
        />
        {/* Basic Score Page */}
        <Route path="/basic-score" element={<BasicScore />} />
        {/* Psychometric Analysis Page */}
        <Route path="/psychometric-analysis" element={<PsychometricForm />} />
        {/* News Sentiment Page  */}
        <Route path="/news-sentiment" element={<NewsApi />} />
      </Routes>
      <Footer />
    </Router>
  );
}

const styles = {
  landingContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap", 
    gap: "20px", 
    justifyContent: "center", 
    padding: "20px",
  },
};

export default App;
