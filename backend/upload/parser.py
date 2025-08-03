import fitz
from backend.utils.openai import get_text_embedding, compute_cosine_similarity, generate_feedback
from strawberry.file_uploads import Upload

async def process_resume_and_jd(resume_file : Upload, jd_file : str):
    resume_text = extract_text(resume_file)

    resume_embedding = get_text_embedding(resume_text)
    jd_embedding = get_text_embedding(jd_file)

    semantic_score = compute_cosine_similarity(resume_embedding, jd_embedding) * 100


    feedback = generate_feedback(resume_text, jd_file)

    return {
        "match_score" : f"{round(semantic_score, 2)}%",
        "gpt_feedback" : feedback,
        "message" : "Resume matched successfully"
    }


def extract_text(file):
    file_text = file.file.read()
    pdf = fitz.open(stream=file_text, filetype="pdf")
    text = ""
    for page in pdf:
        text += page.get_text()
    
    return text

