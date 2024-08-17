from sqlalchemy.orm import Session
from sqlalchemy import and_
from models import Code
from schemas import CodeBase
from user import get_user_id_by_token
from assignment import get_assignments_id_by_name
import json

def get_create_code(db: Session, code: CodeBase):
    # 코드 문자열을 줄 단위로 나누기
    lines = code.code.splitlines()

    # 각 줄을 JSON 형식으로 변환
    code_json = {i + 1: line for i, line in enumerate(lines)}

    # Code 인스턴스를 생성
    db_code = Code(
        assignment_id=get_assignments_id_by_name(db, code.assignment_name),
        code_name=code.code_name,
        user_id=get_user_id_by_token(db, code.token),
        code=code_json  # JSON 형식으로 변환된 코드
    )

    # 데이터베이스 세션에 추가
    db.add(db_code)
    db.commit()
    db.refresh(db_code)

    return db_code

def get_code_by_assignment_name_and_token(db: Session, a_name: str, token: str):
    # assignment_id와 user_id를 가져오기
    assignment_id = get_assignments_id_by_name(db, a_name)
    user_id = get_user_id_by_token(db, token)
    
    # Code 테이블에서 조건에 맞는 모든 레코드 조회
    codes = db.query(Code).filter(
        and_(Code.assignment_id == assignment_id, Code.user_id == user_id)
    ).all()
    
    # 필요한 정보만 추출하여 반환
    result = [
        {
            "code_name": code.code_name,
            "code": code.code
        }
        for code in codes
    ]
    
    return result