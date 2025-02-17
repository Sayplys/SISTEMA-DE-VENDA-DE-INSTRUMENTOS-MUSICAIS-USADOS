from sqlalchemy import Column, Integer, String, Date, DECIMAL, ForeignKey
from sqlalchemy.orm import relationship
from ..database import Base

class Venda(Base):
    __tablename__ = 'venda'

    id = Column(Integer, primary_key=True, nullable=False)
    data_venda = Column(Date, nullable=False)
    valor_venda = Column(DECIMAL(10, 2), nullable=False)
    status_venda = Column(String(20), nullable=False)

    usuario_id = Column(Integer, ForeignKey('usuario.id'), nullable=False)
    pagamento_id = Column(Integer, ForeignKey('pagamento.id'), nullable=False)

    usuario = relationship('Usuario', back_populates='venda') # Relação 1:N entre Usuário e Venda
    pagamento = relationship('Pagamento', back_populates='venda ') # Relação 1:N entre Venda e Pagamento