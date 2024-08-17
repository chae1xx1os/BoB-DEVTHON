from sqlalchemy.orm import Session
from models import Review
from schemas import ReviewCreate, ReviewBase
from user import get_user_id_by_name

def create_review(db: Session, review: ReviewCreate):
    user_id = get_user_id_by_name(db, review.user_name)
    
    db_review = Review(
        user_id=user_id,
        assignment_code_id=review.assignment_code_id,
        content=review.content,
        create_time=review.create_timestamp
    )
    
    db.add(db_review)
    db.commit()
    db.refresh(db_review)
    return db_review

def get_reviews(db: Session, skip: int = 0, limit: int = 10):
    return db.query(Review).offset(skip).limit(limit).all()

def get_review(db: Session, review_id: int):
    return db.query(Review).filter(Review.id == review_id).first()

def update_review(db: Session, review_id: int, updated_data: ReviewBase):
    db_review = db.query(Review).filter(Review.id == review_id).first()
    
    if db_review:
        db_review.content = updated_data.content
        db_review.ddabong = updated_data.ddabong
        db_review.is_update = updated_data.is_update
        db_review.update_time = updated_data.update_time
        db.commit()
        db.refresh(db_review)
        return db_review
    
    return None

def delete_review(db: Session, review_id: int):
    db_review = db.query(Review).filter(Review.id == review_id).first()
    
    if db_review:
        db.delete(db_review)
        db.commit()
        return db_review
    
    return None
