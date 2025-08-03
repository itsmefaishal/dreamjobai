import firebase_admin
from firebase_admin import credentials, auth
from fastapi import Request, HTTPException, Depends, Header
import os
from dotenv import load_dotenv

load_dotenv()

path = os.getenv('CRED_PATH')

cred = credentials.Certificate(path)
firebase_admin.initialize_app(credential=cred)

def verify_token(id_token: str):
    try:
        decoded_token = auth.verify_id_token(id_token)
        return decoded_token  # includes uid, email, etc.
    except Exception as e:
        raise Exception(f"Invalid token: {str(e)}")

def get_current_user_from_token(authorization : str=Header(...)):
    
    try:
        decoded_token = authorization.split(" ")[1]
        user_data = verify_token(decoded_token)
        return user_data
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))
