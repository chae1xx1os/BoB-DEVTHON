import hashlib
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from jose import jwt, JWTError
from datetime import datetime, timedelta
from typing import Optional
from schemas import Review, ReviewBase, ReviewCreate, AssignmentCodeCreate, AssignmentCodeBase, CodeResponse, CodeBase, Token, UserCreate, UserCreateresponse, User as UserSchema
from database import db
from models import Base, User
from user import get_user_id_by_token, get_user_by_username, get_user_by_user_id, create_user as original_create_user
import secrets, uuid

app = FastAPI()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


import hashlib
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from jose import jwt, JWTError
from datetime import datetime, timedelta
from typing import Optional
from schemas import CodeResponse, CodeBase, Token, UserCreate, UserCreateresponse, User as UserSchema
from database import db
from models import Base, User
from user import get_user_id_by_token, get_user_by_username, get_user_by_user_id, create_user as original_create_user
import secrets, uuid, os

app = FastAPI()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return hash_password(plain_password) == hashed_password

SECRET_KEY = "ajdfkldixnldasvckdkdiiehldasnxo"

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    to_encode.update({
        "iat": datetime.utcnow(),
        "jti": str(uuid.uuid4())  # JWT ID를 유니크하게 설정합니다.
    })

    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
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
    
    # 토큰을 데이터베이스에 저장하려면 적절한 방법으로 처리합니다.
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
from code import get_create_code, get_code_by_assignment_name_and_token

@app.get("/api/assignment", response_model=List[Assignment])
def read_assignments(skip: int = 0, limit: int = 10, db: Session = Depends(db.get_session)):
    assignments = assignment_crud.get_assignments(db, skip=skip, limit=limit)
    return assignments

@app.post("/api/assignment", response_model=Assignment)
def create_assignment(assignment: AssignmentCreate, db: Session = Depends(db.get_session)):
    new_assignment = assignment_crud.create_assignment(db=db, assignment=assignment)
    return new_assignment

@app.post("/api/post/code")
def create_code(code: CodeBase, db: Session = Depends(db.get_session)):
    new_code = get_create_code(db=db, code=code)
    return {"code_name": new_code.code_name, "message": "Code created successfully"}

@app.get("/api/code", response_model=List[CodeResponse])
def read_code(
    assignment_name: str, 
    token: str, 
    db: Session = Depends(db.get_session)
):
    # Get codes based on assignment_name and token
    codes = get_code_by_assignment_name_and_token(db, assignment_name, token)
    
    if not codes:
        raise HTTPException(status_code=404, detail="No codes found for the given assignment and token")
    
    return codes

from assignmentcode import get_assignment_codes, get_assignment_code, create_assignment_code, delete_assignment_code, update_assignment_code

@app.post("api/assignment_codes/", response_model=AssignmentCodeBase)
def _create_assignment_code(
    assignment_code: AssignmentCodeBase,
    token: str,
    db: Session = Depends(db.get_session)
):
    return create_assignment_code(db, assignment_code, token)

@app.get("api/assignment_codes/", response_model=List[AssignmentCodeBase])
def read_assignment_codes(skip: int = 0, limit: int = 10, db: Session = Depends(db.get_session)):
    return get_assignment_codes(db, skip=skip, limit=limit)

@app.get("api/assignment_codes/{assignment_code_id}", response_model=AssignmentCodeBase)
def read_assignment_code(assignment_code_id: int, db: Session = Depends(db.get_session)):
    db_assignment_code = get_assignment_code(db, assignment_code_id)
    if db_assignment_code is None:
        raise HTTPException(status_code=404, detail="AssignmentCode not found")
    return db_assignment_code

@app.put("api/assignment_codes/{assignment_code_id}", response_model=AssignmentCodeBase)
def update_assignment_code(
    assignment_code_id: int,
    updated_data: AssignmentCodeBase,
    db: Session = Depends(db.get_session)
):
    db_assignment_code = update_assignment_code(db, assignment_code_id, updated_data)
    if db_assignment_code is None:
        raise HTTPException(status_code=404, detail="AssignmentCode not found")
    return db_assignment_code

@app.delete("api/assignment_codes/{assignment_code_id}", response_model=AssignmentCodeBase)
def delete_assignment_code(assignment_code_id: int, db: Session = Depends(db.get_session)):
    db_assignment_code = delete_assignment_code(db, assignment_code_id)
    if db_assignment_code is None:
        raise HTTPException(status_code=404, detail="AssignmentCode not found")
    return db_assignment_code

from review import create_review, get_review, get_reviews, delete_review, update_review

@app.post("/reviews/", response_model=Review)
def create_review(
    review: ReviewCreate,
    db: Session = Depends(db.get_session)
):
    return create_review(db, review)

@app.get("/reviews/", response_model=List[Review])
def read_reviews(skip: int = 0, limit: int = 10, db: Session = Depends(db.get_session)):
    return get_reviews(db, skip=skip, limit=limit)

@app.get("/reviews/{review_id}", response_model=Review)
def read_review(review_id: int, db: Session = Depends(db.get_session)):
    db_review = get_review(db, review_id)
    if db_review is None:
        raise HTTPException(status_code=404, detail="Review not found")
    return db_review

@app.put("/reviews/{review_id}", response_model=Review)
def update_review(
    review_id: int,
    updated_data: ReviewBase,
    db: Session = Depends(db.get_session)
):
    db_review = update_review(db, review_id, updated_data)
    if db_review is None:
        raise HTTPException(status_code=404, detail="Review not found")
    return db_review

@app.delete("/reviews/{review_id}", response_model=Review)
def delete_review(review_id: int, db: Session = Depends(db.get_session)):
    db_review = delete_review(db, review_id)
    if db_review is None:
        raise HTTPException(status_code=404, detail="Review not found")
    return db_review