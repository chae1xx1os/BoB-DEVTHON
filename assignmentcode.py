from sqlalchemy.orm import Session
from models import AssignmentCode
from schemas import AssignmentCodeBase
from user import get_user_id_by_token
from assignment import get_assignments_id_by_name

def create_assignment_code(db: Session, assignment_code: AssignmentCodeBase, token: str):
    user_id = get_user_id_by_token(db, token)
    assignment_id = get_assignments_id_by_name(db, assignment_code.assignment_name)
    
    db_assignment_code = AssignmentCode(
        user_id=user_id,
        assignment_id=assignment_id,
        submit_date=assignment_code.submit_date,
        laguage=assignment_code.language,
        ai_rate=assignment_code.ai_rate
    )
    
    db.add(db_assignment_code)
    db.commit()
    db.refresh(db_assignment_code)
    return db_assignment_code

def get_assignment_codes(db: Session, skip: int, limit: int):
    return db.query(AssignmentCode).offset(skip).limit(limit).all()

def get_assignment_code(db: Session, assignment_code_id: int):
    return db.query(AssignmentCode).filter(AssignmentCode.id == assignment_code_id).first()

def update_assignment_code(db: Session, assignment_code_id: int, updated_data: AssignmentCodeBase):
    db_assignment_code = db.query(AssignmentCode).filter(AssignmentCode.id == assignment_code_id).first()
    
    if db_assignment_code:
        db_assignment_code.submit_date = updated_data.submit_date
        db_assignment_code.laguage = updated_data.language
        db_assignment_code.ai_rate = updated_data.ai_rate
        db.commit()
        db.refresh(db_assignment_code)
        return db_assignment_code
    
    return None

def delete_assignment_code(db: Session, assignment_code_id: int):
    db_assignment_code = db.query(AssignmentCode).filter(AssignmentCode.id == assignment_code_id).first()
    
    if db_assignment_code:
        db.delete(db_assignment_code)
        db.commit()
        return db_assignment_code
    
    return None