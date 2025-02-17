from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from ..database import Base

class Endereco(Base):
    __tablename__ = 'endereco'

    id = Column(Integer, primary_key=True, nullable=False)
    cep = Column(String(8))
    rua = Column(String(50))
    bairro = Column(String(50))
    uf = Column(String(2))
    complemento = Column(String(50))

    usuario_id = Column(Integer, ForeignKey('usuario.id'), nullable=False)
    
    usuario = relationship('Usuario', back_populates='endereco') # Relação 1:N entre Usuário e Endereço