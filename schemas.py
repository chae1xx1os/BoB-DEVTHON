from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional, Dict

class UserBase(BaseModel):
    user_id: str
    username: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    token: int
    created_at: datetime
    
    class Config:
        from_attributes = True  # 변경된 부분
class UserCreateresponse(UserBase):
    created_at: datetime
class CodeBase(BaseModel):
    assignment_name: str
    code_name: str
    token: str
    code: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

class CodeResponse(BaseModel):
    code_name: str
    code: Dict[int, str]  # JSON 형식으로 저장된 코드

    class Config:
        from_attributes = True
class CodeCreate(CodeBase):
    pass

class Code(CodeBase):
    id: int
    ddabong: int
    
    class Config:
        from_attributes = True  # 변경된 부분

class ReviewBase(BaseModel):
    user_name: str
    assignment_code_id: int
    content: str

class ReviewCreate(ReviewBase):
    create_timestamp: datetime


class Review(ReviewBase):
    id: int
    ddabong: int
    is_update: bool
    create_time: datetime
    update_time: Optional[datetime]
    
    class Config:
        from_attributes = True  # 변경된 부분

class RankBase(BaseModel):
    user_id: str
    rank: int

class RankCreate(RankBase):
    pass

class Rank(RankBase):
    id: int
    update_time: datetime
    
    class Config:
        from_attributes = True  # 변경된 부분

class AssignmentBase(BaseModel):
    assignment_name: str
    due_date: int

class AssignmentCreate(AssignmentBase):
    submit_num: int

class Assignment(AssignmentBase):
    id: int
    
    class Config:
        from_attributes = True  # 변경된 부분

class AssignmentBordBase(BaseModel):
    user_id: str
    assignment_id: int
    submit_num: int
    is_submit: bool

class AssignmentBordCreate(AssignmentBordBase):
    pass

class AssignmentBord(AssignmentBordBase):
    pass

class AssignmentCodeBase(BaseModel):
    token: str
    assignment_id: str
    submit_date: datetime
    language: str
    ai_rate: float

class AssignmentCodeCreate(AssignmentCodeBase):
    skip: int
    limit: int

class AssignmentCode(AssignmentCodeBase):
    id: int
    ddabong: int
    
    class Config:
        from_attributes = True  # 변경된 부분
