from sqlalchemy import Column, Integer, ForeignKey, Date, DECIMAL
from sqlalchemy.orm import relationship
from database import Base

class Pagamento(Base):
    __tablename__ = 'pagamento'

    id = Column(Integer, primary_key=True, index=True)
    data_pagamento = Column(Date)
    valor_pagamento = Column(DECIMAL(10, 2))

    forma_pagamento_id = Column(Integer, ForeignKey("forma_de_pagamento.id"))
    compra_id = Column(Integer, ForeignKey("compra.id"))

    compra = relationship('Compra', back_populates='pagamento') # Relação 1:N entre Pagamento e Compra
    forma_pagamento = relationship('FormaPagamento', back_populates='pagamento') # Relação 1:1 entre Forma de Pagamento e Pagamento
    venda = relationship('venda', back_populates='pagamento') # Relação 1:N entre Pagamento e Venda