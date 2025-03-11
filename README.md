# Alternative Credit Scoring API

## Overview
This project provides an alternative credit scoring method using a FastAPI-based backend. It evaluates creditworthiness through three approaches:

1. **Financial Credit Score** - Assesses financial stability using income, revenue, debt, and other financial factors.
2. **Psychometric Credit Score** - Measures financial responsibility through behavioral traits.
3. **News Sentiment Credit Score** - Analyzes news sentiment related to an entity to infer risk level.

By combining these three scores, businesses can be evaluated for loan eligibility without relying solely on traditional financial scores. This approach helps micro, small, and medium enterprises (MSEs) and small businesses gain access to credit based on a more holistic assessment.

## Features
- REST API endpoints for credit score calculations.
- Uses Pydantic for request validation.
- Implements CORS middleware for cross-origin requests.
- Uses a transformer-based model for news sentiment analysis.
- Leverages PyTorch for deep learning-based sentiment analysis in credit scoring.

## Installation
### Prerequisites
- Python 3.8+
- pip

### Setup
1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/alternative-credit-scoring.git
    cd alternative-credit-scoring
    ```
2. Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
3. Run the FastAPI server:
    ```bash
    uvicorn main:app --reload
    ```
4. Access the API documentation:
    - Open [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs) in your browser.

## API Endpoints
### 1. Financial Credit Score
**Endpoint:**
```
POST /calculate_basic_score
```
**Request Body:**
```json
{
  "income": 50000,
  "revenue": 200000,
  "debt": 30000,
  "credit_utilization": 40,
  "loan_repayment": 90,
  "business_age": 5,
  "transaction_patterns": 75,
  "growth_rate": 10
}
```
**Response:**
```json
{
  "score": 72.5,
  "risk_category": "Medium Risk",
  "risk_color": "yellow"
}
```

### 2. Psychometric Credit Score
**Endpoint:**
```
POST /calculate_psychometric_score
```
**Request Body:**
```json
{
  "risk_tolerance": 80,
  "financial_responsibility": 90,
  "future_planning": 70,
  "impulse_control": 75,
  "loan_attitude": 60
}
```
**Response:**
```json
{
  "psychometric_score": 78.0,
  "risk_category": "Medium Risk",
  "risk_color": "yellow"
}
```

### 3. News Sentiment Credit Score
**Endpoint:**
```
POST /calculate_news_credit_score
```
**Request Body:**
```json
{
  "query": "Tesla Stock Performance"
}
```
**Response:**
```json
{
  "news_sentiment_score": 85.2,
  "risk_category": "Low Risk",
  "risk_color": "green"
}
```

## Dependencies
- FastAPI
- Pydantic
- Requests
- Transformers (Hugging Face for sentiment analysis)
- PyTorch (Used for deep learning-based sentiment analysis)
- Torch


## Contributing
Feel free to contribute by submitting issues or pull requests.



