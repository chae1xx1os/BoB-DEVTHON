from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional

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
    assignment_id: int
    code_name: str
    user_id: int
    code: dict

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

class CodeCreate(CodeBase):
    pass

class Code(CodeBase):
    id: int
    ddabong: int
    
    class Config:
        from_attributes = True  # 변경된 부분

class ReviewBase(BaseModel):
    user_id: str
    code_id: int
    content: str

class ReviewCreate(ReviewBase):
    pass

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
    user_id: int
    assignment_id: int
    submit_date: datetime
    language: str
    ai_rate: float

class AssignmentCodeCreate(AssignmentCodeBase):
    pass

class AssignmentCode(AssignmentCodeBase):
    id: int
    ddabong: int
    
    class Config:
        from_attributes = True  # 변경된 부분
