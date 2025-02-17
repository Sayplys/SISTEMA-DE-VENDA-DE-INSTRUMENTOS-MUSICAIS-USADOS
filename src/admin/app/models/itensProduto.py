from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class ItensProduto(Base):
    __tablename__ = 'itens_produto'

    fk_id_pedido = Column(Integer, ForeignKey('pedido.id'), primary_key=True, nullable=False)
    fk_id_produto = Column(Integer, ForeignKey('produto.id'), primary_key=True, nullable=False)
    quantidade = Column(Integer, nullable=False)

    pedido = relationship('Pedido', back_populates='itens') # Relação de 1:N entre Itens Produto e Pedido
    produto = relationship('Produto', back_populates='itens') # Relação de 1:N entre Itens Produto e Produto