from pydantic import BaseModel, Field
from typing import Optional

class EnderecoBase(BaseModel):
    cep: str = Field(..., max_length=8)
    rua: str = Field(..., max_length=50)
    bairro: str = Field(..., max_length=50)
    uf: str = Field(..., max_length=2)
    complemento: Optional[str] = Field(None, max_length=50)
    usuario_id: int

class EnderecoCreate(EnderecoBase):
    pass

class Endereco(EnderecoBase):
    id: int

    class Config:
        from_attributes = True