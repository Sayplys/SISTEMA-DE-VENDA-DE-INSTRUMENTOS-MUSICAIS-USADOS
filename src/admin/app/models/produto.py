from sqlalchemy import Column, Integer, String, DECIMAL, ForeignKey
from sqlalchemy.orm import relationship
from ..database import Base

class Produto(Base):
    __tablename__ = 'produto'

    id = Column(Integer, primary_key=True, nullable=False)
    nome = Column(String(50), nullable=False)
    descricao = Column(String(200))
    categoria = Column(String(50))
    familia = Column(String(50))
    grupo = Column(String(50))
    preco = Column(DECIMAL(10,2), nullable=False)
    imagem = Column(String, nullable=True)

    usuario_id = Column(Integer, ForeignKey='usuario.id', nullable=False)
    
    usuario = relationship('Usuario', back_populates='produto') # Relação 1:N entre Usuário e Produto
    itens = relationship('itensProduto', back_populates='produto') # Relação 1:N entre Itens Produto e Produto