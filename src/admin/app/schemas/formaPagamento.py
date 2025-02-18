from pydantic import BaseModel, Field

class FormaPagamentoBase(BaseModel):
    parcelamento: int
    desconto: float = Field(..., ge=0)
    taxa_juros: float = Field(..., ge=0)
    ativo: bool

class FormaPagamentoCreate(FormaPagamentoBase):
    pass

class FormaPagamento(FormaPagamentoBase):
    id: int

    class Config:
        from_attributes = True