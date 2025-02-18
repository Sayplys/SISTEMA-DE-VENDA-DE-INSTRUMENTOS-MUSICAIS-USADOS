from pydantic import BaseModel, Field
from datetime import date

class PedidoBase(BaseModel):
    descricao: str = Field(..., max_length=200)
    data_pedido: date
    status: str = Field(..., max_length=20)
    usuario_id: int

class PedidoCreate(PedidoBase):
    pass

class Pedido(PedidoBase):
    id: int

    class Config:
        from_attributes = True