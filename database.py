import os
import pymysql
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, scoped_session
from sqlalchemy.ext.declarative import declarative_base

from config import conf

DB_PASSWORD = conf['dbpassword']
DB_NAME = 'bot'
HOST = 'localhost'

initial_conn_str = f'mysql+pymysql://root:{DB_PASSWORD}@{HOST}:3306'
initial_engine = create_engine(initial_conn_str, pool_pre_ping=True, connect_args={'connect_timeout': 10})

with initial_engine.connect() as conn:
    conn.execute(text(f"CREATE DATABASE IF NOT EXISTS {DB_NAME}"))
    conn.execute(text(f"USE {DB_NAME}"))

DB_CONN = f'mysql+pymysql://root:{DB_PASSWORD}@{HOST}:3306/{DB_NAME}'

class SQLAlchemy():
    def __init__(self):
        self.engine = create_engine(DB_CONN, pool_pre_ping=True, pool_size=20, max_overflow=0, pool_recycle=3600, connect_args={'connect_timeout': 10})
        self.Session = scoped_session(sessionmaker(bind=self.engine, autoflush=False, autocommit=False))

    def get_session(self):
        db = self.Session()
        try:
            yield db
        finally:
            db.close()

db = SQLAlchemy()
Base = declarative_base()

from models import Access_Table, User

Base.metadata.create_all(db.engine)
