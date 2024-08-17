import hashlib
from sqlalchemy.orm import Session
from models import User
from schemas import UserCreate
from fastapi import HTTPException

def hash_password(password: str) -> str:
    """SHA-256을 사용하여 비밀번호를 해싱합니다."""
    return hashlib.sha256(password.encode()).hexdigest()

def get_user_by_username(db: Session, username: str):
    """사용자 이름으로 사용자를 조회합니다."""
    return db.query(User).filter(User.username == username).first()
def get_user_by_user_id(db: Session, user_id: str):
    """사용자 이름으로 사용자를 조회합니다."""
    return db.query(User).filter(User.user_id == user_id).first()
def get_user_by_token(db: Session, token: str):
    """토큰으로 사용자를 조회합니다."""
    return db.query(User).filter(User.token == token).first()

def get_user_id_by_token(db: Session, token: str):
    return db.query(User).filter(User.token == token).first().user_id

def create_user(db: Session, user: UserCreate):
    # 사용자 이름이 이미 존재하는지 확인
    existing_user = get_user_by_username(db, user.username)

    if existing_user:
        # 사용자 이름이 이미 존재하면 HTTPException 발생
        raise HTTPException(status_code=400, detail="Username already registered")
    existing_user = get_user_by_user_id(db, user.user_id)
        
    if existing_user:
        # 사용자 이름이 이미 존재하면 HTTPException 발생
        raise HTTPException(status_code=400, detail="Userid already registered")

    # 비밀번호 해싱
    hashed_password = hash_password(user.password)
    
    # 새로운 사용자 객체 생성
    db_user = User(username=user.username, user_id=user.user_id, password=hashed_password)
    
    # 데이터베이스에 추가
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    return db_user