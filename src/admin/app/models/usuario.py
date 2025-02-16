from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from database import Base

class Usuario(Base):
    __tablename__ = 'usuario'

    id = Column(Integer, primary_key=True, nullable=False)
    nome = Column(String(50))
    cpf = Column(String(11), nullable=False)
    email = Column(String(50), nullable=False)
    senha = Column(String(100), nullable=False)
    telefone = Column(String(20), nullable=False)
    nivel_acesso = Column(String(10), nullable=False)

    endereco = relationship('Endereco', back_populates='usuario') # Relação 1:N entre Usuário e Endereço

    produto = relationship('Produto', back_populates='usuario') # Relação 1:N entre Usuário e Produto

    pedido = relationship('Pedido', back_populates='usuario') # Relação 1:N entre Usuário e Pedido