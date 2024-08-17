from sqlalchemy.orm import Session
import models, schemas
from models import Assignment
from sqlalchemy.exc import IntegrityError
def get_assignments(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Assignment).offset(skip).limit(limit).all()

def get_assignments_id_by_name(db: Session, name):
    return db.query(Assignment).filter(Assignment.assignment_name == name).first().id

def create_assignment(db: Session, assignment: schemas.AssignmentCreate):
    db_assignment = models.Assignment(
        assignment_name=assignment.assignment_name,
        due_date=assignment.due_date,
        submit_num=assignment.submit_num
    )
    db.add(db_assignment)
    db.commit()
    db.refresh(db_assignment)
    return db_assignment

