import fastapi
from fastapi import Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from database import db
import crud.user
from fastapi.middleware.cors import CORSMiddleware

app=fastapi()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 모든 도메인 허용
    allow_credentials=True,
    allow_methods=["*"],  # 모든 HTTP 메소드 허용
    allow_headers=["*"],  # 모든 헤더 허용
)
@app.get("/api")
def usr():
    return {
    }
class UserRequest(BaseModel):
    user_id: str

@app.post("/api/register")
def register_user(request: UserRequest, db: Session = Depends(db.get_session)):
    return crud.create_or_update_user(db, request.user_id)
