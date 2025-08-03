import os
from dotenv import load_dotenv
import requests
from sentence_transformers import SentenceTransformer, util

load_dotenv()

embedding_model = SentenceTransformer('all-MiniLM-L6-v2')

def get_text_embedding(text: str) -> list:
    return embedding_model.encode(text).tolist()

def compute_cosine_similarity(vec1, vec2) -> float:
    return float(util.cos_sim(vec1, vec2)[0][0])



API_URL = os.getenv("HUGGINGFACE_API_URL")

headers = {
    "Authorization" : f"Bearer {os.getenv("HUGGINGFACE_API_KEY")}",
}

def generate_feedback(resume, jd):

    prompt = f"""
        You are a recuriter at a renowned company. Given the resume and job description below, provide:
        - A match score out of 100
        - A short explanation of why it's a good or bad match
        - 3 specific suggestions to improve the resume
        - Give feedback in brief but it should be impactful

        Resume:
        {resume}

        Job Description:
        {jd}
        """

    payload = {
        "messages" : [
            {
                "role" : "user",
                "content" : prompt
            }
        ],
        "model" : "moonshotai/Kimi-K2-Instruct",
    }

    response = requests.post(API_URL, headers=headers, json=payload)

    if response.status_code != 200 :
        return f"Error : {response.status_code} , {response.text}"
    
    try :
        result = response.json()

        if result :
            return result["choices"][0]["message"]["content"]

    except Exception as e:
        return f"Error parsing response: {str(e)}"