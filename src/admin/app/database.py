from sqlalchemy import create_engine, text
from sqlalchemy.orm import declarative_base, sessionmaker
import json

# Carregar configurações do arquivo JSON
with open('src/admin/app/settings.json') as config:
    settings = json.load(config)

DATABASE_URL = f"mysql+pymysql://{settings['database']['user']}:{settings['database']['password']}@{settings['database']['host']}:{settings['database']['port']}"

# Criar engine de conexão
engine = create_engine(DATABASE_URL, echo=False)

def database_exists(connection, db_name: str) -> bool:
    # Verifica se o banco de dados já existe
    query = text("SHOW DATABASES LIKE :db_name")
    result = connection.execute(query, {'db_name': db_name}).fetchone()
    return result is not None

def create_database():
    try:
        with engine.connect() as connection:
            if database_exists(connection, settings['database']['db_name']):
                print(f"O banco de dados {settings['database']['db_name']} já existe.\n")
            else:
                connection.execute(text(f"CREATE DATABASE {settings['database']['db_name']}"))
                print(f"Banco de dados {settings['database']['db_name']} criado com sucesso!\n")

                updated_database_url = f"mysql+pymysql://{settings['database']['user']}:{settings['database']['password']}@{settings['database']['host']}:{settings['database']['port']}/{settings['database']['db_name']}"
                print(f"URL de conexão atualizada para o banco de dados {settings['database']['db_name']}.\n")

                return updated_database_url

    except Exception as e:
        print(f"Erro ao tentar criar o banco de dados: {e}\n")
        return None

DATABASE_URL = create_database() or DATABASE_URL

engine = create_engine(DATABASE_URL, echo=False)

# Configuração da base e sessão
Base = declarative_base()
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
