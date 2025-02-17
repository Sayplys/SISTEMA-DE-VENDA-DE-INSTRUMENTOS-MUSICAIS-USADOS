from pydantic import BaseModel, Field
from datetime import date

class VendaBase(BaseModel):
    data_venda: date
    valor_venda: float
    status_venda: str = Field(..., max_length=20)
    usuario_id: str = Field(..., max_length=20)
    pagamento_id: str = Field(..., max_length=10)

class VendaCreate(VendaBase):
    pass

class Venda(VendaBase):
    id: int

    class Config:
        orm_mode = True