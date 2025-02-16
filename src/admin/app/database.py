from sqlalchemy import create_engine, text
from sqlalchemy.orm import declarative_base
import json

with open('src/admin/app/settings.json') as config:
    settings = json.load(config)

DATABASE_URL = f"mysql+pymysql://{settings['database']['user']}:{settings['database']['password']}@{settings['database']['host']}:{settings['database']['port']}"

# Create connection
engine = create_engine(DATABASE_URL, echo=False)

def create_database():
    
    global DATABASE_URL

    try:
        with engine.connect() as connection:
            result = connection.execute(text("SHOW DATABASES LIKE :db_name"), {'db_name': settings['database']['db_name']}).fetchone()
            
            if result:
                print(f"O banco de dados {settings['database']['db_name']} já existe.\n")

            else:
                connection.execute(text(f"CREATE DATABASE {settings['database']['db_name']}"))
                print(f"Banco de dados {settings['database']['db_name']} criado com sucesso!\n")

        DATABASE_URL = f"mysql+pymysql://{settings['database']['user']}:{settings['database']['password']}@{settings['database']['host']}:{settings['database']['port']}/{settings['database']['db_name']}"

        print(f"URL de conexão atualizada para o banco de dados {settings['database']['db_name']}.\n")

    except Exception as e:
        print(f"Erro ao tentar criar o banco de dados: {e}\n")

create_database()

# Return connection after 'DATABASE_URL' update
engine = create_engine(DATABASE_URL, echo=False)

base = declarative_base()