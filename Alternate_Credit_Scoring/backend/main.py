from fastapi import FastAPI
from pydantic import BaseModel
from typing import Dict
from fastapi.middleware.cors import CORSMiddleware
import requests
import torch
from transformers import pipeline

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],
)

# ---------------------- Financial Credit Score Calculation ----------------------

class FinancialData(BaseModel):
    income: float
    revenue: float
    debt: float
    credit_utilization: float
    loan_repayment: float
    business_age: float
    transaction_patterns: float
    growth_rate: float

def calculate_basic_score(data: FinancialData) -> Dict:
    """Calculate basic financial credit score with improved normalization."""
    
    weights = {
        "income": 0.15,
        "revenue": 0.15,
        "debt": -0.20,
        "credit_utilization": -0.10,
        "loan_repayment": 0.20,
        "business_age": 0.10,
        "transaction_patterns": 0.15,
        "growth_rate": 0.15
    }
    
    normalized_values = {
        "income": data.income / 100000,
        "revenue": data.revenue / 500000,
        "debt": data.debt / 100000,
        "credit_utilization": data.credit_utilization / 100,
        "loan_repayment": data.loan_repayment / 100,
        "business_age": data.business_age / 20,
        "transaction_patterns": data.transaction_patterns / 100,
        "growth_rate": data.growth_rate / 50,
    }

    score = sum([
        normalized_values[key] * weight for key, weight in weights.items()
    ]) * 100  

    score = max(0, min(100, round(score, 2)))

    risk_category, risk_color = ("Low Risk", "green") if score >= 80 else \
                                ("Medium Risk", "yellow") if score >= 50 else \
                                ("High Risk", "red")

    return {"score": score, "risk_category": risk_category, "risk_color": risk_color}

@app.post("/calculate_basic_score")
def calculate_basic_credit_score(data: FinancialData):
    return calculate_basic_score(data)

# ---------------------- Psychometric Credit Score Calculation ----------------------

class PsychometricData(BaseModel):
    risk_tolerance: int
    financial_responsibility: int
    future_planning: int
    impulse_control: int
    loan_attitude: int

def calculate_credit_score(data: PsychometricData) -> Dict:
    """Calculate psychometric credit score with proper weighting."""
    
    weights = {
        "risk_tolerance": 0.2,
        "financial_responsibility": 0.3,
        "future_planning": 0.2,
        "impulse_control": 0.2,
        "loan_attitude": 0.1
    }
    
    score = sum([
        data.risk_tolerance * weights["risk_tolerance"],
        data.financial_responsibility * weights["financial_responsibility"],
        data.future_planning * weights["future_planning"],
        data.impulse_control * weights["impulse_control"],
        data.loan_attitude * weights["loan_attitude"]
    ])
    
    risk_category, risk_color = ("Low Risk", "green") if score > 80 else \
                                ("Medium Risk", "yellow") if score > 60 else \
                                ("High Risk", "red")

    return {"psychometric_score": round(score, 2), "risk_category": risk_category, "risk_color": risk_color}

@app.post("/calculate_psychometric_score")
def calculate_psychometric_credit_score(data: PsychometricData):
    return calculate_credit_score(data)

# ---------------------- News Sentiment Credit Score Calculation ----------------------

class NewsSentimentRequest(BaseModel):
    query: str  

def fetch_news_articles(query: str):
    """Fetch recent news articles related to the given query."""
    API_KEY = "your_news_api_key_here"
    url = f"https://newsapi.org/v2/everything?q={query}&apiKey={API_KEY}"
    response = requests.get(url)
    
    if response.status_code == 200:
        articles = response.json().get("articles", [])
        return [article["title"] + " " + article.get("description", "") for article in articles[:5]]  
    return []

def analyze_sentiment(news_articles):
    """Use a transformer model to analyze sentiment of news articles."""
    sentiment_model = pipeline("sentiment-analysis")
    sentiments = sentiment_model(news_articles)

    scores = {"positive": 1, "neutral": 0, "negative": -1}
    sentiment_scores = [scores.get(s["label"].lower(), 0) * s["score"] for s in sentiments]

    return sum(sentiment_scores) / len(sentiment_scores) if sentiment_scores else 0  

def calculate_news_credit_score(data: NewsSentimentRequest) -> Dict:
    """Compute a news-based credit score."""
    articles = fetch_news_articles(data.query)
    
    if not articles:
        return {"error": "No relevant news articles found"}

    sentiment_score = analyze_sentiment(articles)

    normalized_sentiment_score = (sentiment_score + 1) * 50

    risk_category, risk_color = ("Low Risk", "green") if normalized_sentiment_score >= 80 else \
                                ("Medium Risk", "yellow") if normalized_sentiment_score >= 50 else \
                                ("High Risk", "red")

    return {
        "news_sentiment_score": round(normalized_sentiment_score, 2),
        "risk_category": risk_category,
        "risk_color": risk_color
    }

@app.post("/calculate_news_credit_score")
def calculate_news_credit_score_endpoint(data: NewsSentimentRequest):
    return calculate_news_credit_score(data)
