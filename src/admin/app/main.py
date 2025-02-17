from fastapi import FastAPI
from .routes import usuario, venda, produto
from sqlalchemy import create_engine, text
from .database import engine, settings, database_exists

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

# Inicializa o FastAPI
app = FastAPI()

# Aplicação das rotas das APIs
app.include_router(usuario.router, prefix="/api", tags=["Usuários"])
app.include_router(venda.router, prefix="/api", tags=["Vendas"])
app.include_router(produto.router, prefix="/api", tags=["Produtos"])