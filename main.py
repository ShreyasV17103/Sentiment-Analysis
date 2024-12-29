from fastapi import FastAPI, UploadFile, File, HTTPException, Depends
from fastapi.security import APIKeyHeader
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import pandas as pd

app = FastAPI()

# Authentication setup
API_KEY = "mysecureapikey"
api_key_header = APIKeyHeader(name="Authorization")

def verify_api_key(key: str = Depends(api_key_header)):
    if key != f"Bearer {API_KEY}":
        raise HTTPException(status_code=403, detail="Invalid API Key")

# Sentiment Analysis
analyzer = SentimentIntensityAnalyzer()

def analyze_sentiment(text):
    score = analyzer.polarity_scores(text)
    if score["compound"] >= 0.05:
        return "positive"
    elif score["compound"] <= -0.05:
        return "negative"
    else:
        return "neutral"

# Endpoints
@app.post("/analyze")
def analyze_csv(file: UploadFile = File(...), auth: str = Depends(verify_api_key)):
    if not file.filename.endswith(".csv"):
        raise HTTPException(status_code=400, detail="File must be a CSV")
    df = pd.read_csv(file.file)
    if "text" not in df.columns:
        raise HTTPException(status_code=400, detail="CSV must contain 'text' column")
    df["sentiment"] = df["text"].apply(analyze_sentiment)
    distribution = df["sentiment"].value_counts().to_dict()
    return {"results": df.to_dict(orient="records"), "distribution": distribution}
