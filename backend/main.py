from fastapi import FastAPI, Request, UploadFile, File, Form, Depends
from backend.auth.auth import get_current_user_from_token
from backend.upload.parser import process_resume_and_jd
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/test")
def get_context(user_data=Depends(get_current_user_from_token)):
    
    return {"message": "Authenticated", "user": user_data}


@app.get("/")
def read_root():
    return {"Hello from DreamJobAI backend"}


@app.post("/upload")
async def upload_resume_and_jd(
    resume : UploadFile = File(...), 
    jd : str = Form(...),
    # user_data = Depends(get_current_user_from_token)
    ):

    try:
        result = await process_resume_and_jd(resume, jd)
        # result["user"] = user_data
        
        return result
    
    except Exception as e:
        return JSONResponse(content={"error" : str(e)}, status_code=500)

