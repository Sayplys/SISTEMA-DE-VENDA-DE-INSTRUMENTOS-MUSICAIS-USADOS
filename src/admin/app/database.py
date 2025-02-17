from sqlalchemy import create_engine, text
from sqlalchemy.orm import declarative_base, sessionmaker
import json

with open('src/admin/app/settings.json') as config:
    settings = json.load(config)

DATABASE_URL = f"mysql+pymysql://{settings['database']['user']}:{settings['database']['password']}@{settings['database']['host']}:{settings['database']['port']}"

# Cria a engine de conexão
engine = create_engine(DATABASE_URL, echo=False)

def database_exists(connection, db_name: str) -> bool:
    # Verifica se o banco de dados já existe
    query = text("SHOW DATABASES LIKE :db_name")
    result = connection.execute(query, {'db_name': db_name}).fetchone()
    
    return result is not None

# Configurar a base e a sessão
Base = declarative_base()
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    # Inicializa uma sessão no banco de dados
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()