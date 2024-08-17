import hashlib
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from jose import jwt, JWTError
from datetime import datetime, timedelta
from typing import Optional
from schemas import Token, UserCreate, UserCreateresponse, User as UserSchema
from database import db
from models import Base, User
from user import get_user_id_by_token, get_user_by_username, get_user_by_user_id, create_user as original_create_user

app = FastAPI()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

SECRET_KEY = "YOUR_SECRET_KEY"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return hash_password(plain_password) == hashed_password

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

@app.post("/api/token", response_model=Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(db.get_session)):
    user = get_user_by_user_id(db, form_data.username)
    if not user or not verify_password(form_data.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    
    # 토큰을 데이터베이스에 저장
    user.token = access_token
    db.add(user)
    db.commit()
    db.refresh(user)
    
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/api/users", response_model=UserCreateresponse)
def create_user_endpoint(user: UserCreate, db: Session = Depends(db.get_session)):
    db_user = get_user_by_username(db, user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    # UserCreate 객체를 새로 생성할 때 password 값을 직접 설정하지 않고, dict를 수정
    user_data = user.dict()
    
    new_user = original_create_user(db, UserCreate(**user_data))
    return UserCreateresponse(
        user_id=new_user.user_id,
        username=new_user.username,
        created_at=new_user.created_at
    )

import assignment as assignment_crud
from schemas import Assignment, AssignmentCreate
from typing import List

@app.get("/api/assignment", response_model=List[Assignment])
def read_assignments(skip: int = 0, limit: int = 10, db: Session = Depends(db.get_session)):
    assignments = assignment_crud.get_assignments(db, skip=skip, limit=limit)
    return assignments

@app.post("/api/assignment", response_model=Assignment)
def create_assignment(assignment: AssignmentCreate, db: Session = Depends(db.get_session)):
    new_assignment = assignment_crud.create_assignment(db=db, assignment=assignment)
    return new_assignment

import assignmentbord, schemas

@app.get("/api/assignmentbord/{token}", response_model=List[schemas.AssignmentBordBase])
def read_assignment_bords(token: str, db: Session = Depends(db.get_session)):
    user_id = get_user_id_by_token(db, token)
    if not user_id:
        raise HTTPException(status_code=404, detail="User not found")
    
    assignment_bords = assignmentbord.get_assignment_bords_for_user(db, user_id)
    return [
        schemas.AssignmentBordBase(
            assignment_name=ab.assignment_name,
            is_submit=ab.is_submit
        )
        for ab in assignment_bords
    ]