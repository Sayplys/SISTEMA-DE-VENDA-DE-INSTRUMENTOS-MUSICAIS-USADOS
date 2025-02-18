from pydantic import BaseModel, Field
from datetime import date

class CompraBase(BaseModel):
    descricao: str = Field(..., max_length=200)
    data_compra: date
    status: str = Field(..., max_length=20)
    pedido_id: int

class CompraCreate(CompraBase):
    pass

class Compra(CompraBase):
    id: int

    class Config:
        from_attributes = True