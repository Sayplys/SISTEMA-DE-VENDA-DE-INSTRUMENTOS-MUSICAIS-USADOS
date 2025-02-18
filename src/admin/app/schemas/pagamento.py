from pydantic import BaseModel, Field
from datetime import date

class PagamentoBase(BaseModel):
    data_pagamento: date
    valor_pagamento: float = Field(..., gt=0)
    forma_pagamento_id: int
    compra_id: int

class PagamentoCreate(PagamentoBase):
    pass

class Pagamento(PagamentoBase):
    id: int

    class Config:
        from_attributes = True