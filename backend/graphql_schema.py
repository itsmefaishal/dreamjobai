import strawberry
from strawberry.file_uploads import Upload
from backend.upload.parser import process_resume_and_jd

@strawberry.type
class ResumeResponse:
    match_score: float
    gpt_feedback: str
    message: str

@strawberry.type
class Mutation:
    @strawberry.mutation
    async def submit_resume(self, resume: Upload, jd: str) -> ResumeResponse:
        result = await process_resume_and_jd(resume, jd)
        return ResumeResponse(
            match_score=result["match_score"],
            gpt_feedback=result["gpt_feedback"],
            message=result["message"]
        )

@strawberry.type
class Query:
    @strawberry.field
    def hello(self) -> str:
        return "world"

schema = strawberry.Schema(query=Query, mutation=Mutation)
