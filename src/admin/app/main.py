from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, text
from .models import *
from .routes import usuario, venda, produto
from .database import Base, engine, settings, database_exists
from fastapi.middleware.cors import CORSMiddleware

# Cria o banco de dados, se não existir
def create_database():
    try:
        with engine.connect() as connection:
            if not database_exists(connection, settings['database']['db_name']):
                connection.execute(text(f"CREATE DATABASE {settings['database']['db_name']}"))
                print(f"Banco de dados {settings['database']['db_name']} criado com sucesso!")

            else:
                print(f"O banco de dados {settings['database']['db_name']} já existe.")

    except Exception as e:
        print(f"Erro ao tentar criar o banco de dados: {e}")

create_database()

Base.metadata.create_all(bind=engine)

# Inicializa o FastAPI
app = FastAPI()

# Configuração do CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],  # Substitua pelo endereço do seu frontend
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos os métodos (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Permite todos os cabeçalhos
)

# Rotas das APIs
app.include_router(usuario.router, prefix="/api", tags=["Usuários"])
app.include_router(venda.router, prefix="/api", tags=["Vendas"])
app.include_router(produto.router, prefix="/api", tags=["Produtos"])
