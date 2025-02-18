from pydantic import BaseModel, Field
from datetime import date

class VendaBase(BaseModel):
    data_venda: date
    valor_venda: float = Field(..., gt=0)
    status_venda: str = Field(..., max_length=20)
    usuario_id: int
    pagamento_id: int

class VendaCreate(VendaBase):
    pass

class Venda(VendaBase):
    id: int

    class Config:
        from_attributes = True