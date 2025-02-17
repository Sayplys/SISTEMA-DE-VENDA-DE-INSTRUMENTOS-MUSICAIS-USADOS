from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from ..database import Base

class Compra(Base):
    __tablename__ = 'compra'

    id = Column(Integer, primary_key=True, nullable=False)
    descricao = Column(String(200))
    data_compra = Column(Date, nullable=False)
    status = Column(String(20))

    pedido_id = Column(Integer, ForeignKey='pedido.id', nullable=False)
    
    pedido = relationship('Pedido', back_populates='compra') # Relação 1:N entre Pedido e Compra
    pagamento = relationship('Pagamento', back_populates='compra') # Relação 1:N entre Compra e Pagamento