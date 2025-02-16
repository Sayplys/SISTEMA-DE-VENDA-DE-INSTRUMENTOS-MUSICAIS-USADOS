from sqlalchemy import Column, Integer, String, Date, DECIMAL, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Pedido(Base):
    __tablename__ = 'pedido'

    id = Column(Integer, primary_key=True, nullable=False)
    descricao = Column(String(200))
    data_pedido = Column(Date, nullable=False)
    status = Column(String(20))
    valor_total = Column(DECIMAL(10,2), nullable=False)

    usuario_id = Column(Integer, ForeignKey='usuario.id', nullable=False)

    usuario = relationship('Usuario', back_populates='pedido') # Relação 1:N entre Usuário e Pedido