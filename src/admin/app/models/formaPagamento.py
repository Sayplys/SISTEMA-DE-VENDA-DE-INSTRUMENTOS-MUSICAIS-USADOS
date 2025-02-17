from sqlalchemy import Column, Integer, DECIMAL, Boolean
from sqlalchemy.orm import relationship
from database import Base

class FormaPagamento(Base):
    __tablename__ = 'forma_de_pagamento'

    id = Column(Integer, primary_key=True, index=True)
    parcelamento = Column(Integer)
    desconto = Column(DECIMAL(5, 2))
    taxa_juros = Column(DECIMAL(5, 2))
    ativo = Column(Boolean, default=True)

    pagamento = relationship('Pagamento', back_populates='forma_pagamento') # Relação 1:1 entre Forma de Pagamento e Pagamento