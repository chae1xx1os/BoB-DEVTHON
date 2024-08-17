from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, JSON, Double, Timestamp, UniqueConstraint
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, unique=True, nullable=False, index=True)
    username = Column(String, nullable=False)
    password = Column(String, nullable=False)
    token = Column(Integer, default=0)
    created_at = Column(Timestamp, nullable=False, server_default='CURRENT_TIMESTAMP')

class Code(Base):
    __tablename__ = 'code'
    
    id = Column(Integer, primary_key=True, index=True)
    assignment_id = Column(Integer, ForeignKey('assignment.id'), nullable=False)
    code_name = Column(String, nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    code = Column(JSON, nullable=False)

class Review(Base):
    __tablename__ = 'review'
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    assignment_code_id = Column(Integer, ForeignKey('assignment_code.id'), nullable=False)
    content = Column(String, nullable=False)
    ddabong = Column(Integer)
    is_update = Column(Boolean, default=False)
    create_time = Column(Timestamp, nullable=False, server_default='CURRENT_TIMESTAMP')
    update_time = Column(Timestamp)

class Rank(Base):
    __tablename__ = 'rank'
    
    id = Column(Integer, primary_key=True, index=True)
    rank = Column(Integer, nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    update_time = Column(Timestamp, nullable=False, server_default='CURRENT_TIMESTAMP')

 
class Assignment(Base):
    __tablename__ = 'assignment'
    
    id = Column(Integer, primary_key=True, index=True)
    assignment_name = Column(String, nullable=False)
    submit_num = Column(Integer, default=0)
    due_date = Column(Integer, nullable=False)

   
class AssignmentBord(Base):
    __tablename__ = 'assignment_bord'
    
    user_id = Column(Integer, ForeignKey('users.id'), primary_key=True)
    assignment_id = Column(Integer, ForeignKey('assignment.id'), primary_key=True)
    is_submit = Column(Boolean, default=False)

    __table_args__ = (UniqueConstraint('user_id', 'assignment_id', name='_user_assignment_uc'),)

class AssignmentCode(Base):
    __tablename__ = 'assignment_code'
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    assignment_id = Column(Integer, ForeignKey('assignment.id'), nullable=False)
    submit_date = Column(Timestamp, nullable=False, server_default='CURRENT_TIMESTAMP')
    laguage = Column(String, nullable=False)
    ai_rate = Column(Double)
    ddabong = Column(Integer)

class CodeDdabong(Base):
    __tablename__ = 'code_ddabong'
    
    user_id = Column(Integer, ForeignKey('users.id'), primary_key=True)
    assignment_code_id = Column(Integer, ForeignKey('assignment_code.id'), primary_key=True)

    __table_args__ = (UniqueConstraint('user_id', 'assignment_code_id', name='_user_assignment_code_uc'),)

class ReviewDdabong(Base):
    __tablename__ = 'review_ddabong'
    
    user_id = Column(Integer, ForeignKey('users.id'), primary_key=True)
    review_id = Column(Integer, ForeignKey('review.id'), primary_key=True)

    __table_args__ = (UniqueConstraint('user_id', 'review_id', name='_user_review_uc'),)
