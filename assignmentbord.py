from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
import models, schemas


def get_assignment_bords_for_user(db: Session, user_id: int):
    return db.query(models.AssignmentBord).filter(models.AssignmentBord.user_id == user_id).all()
