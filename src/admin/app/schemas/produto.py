from pydantic import BaseModel, Field
from typing import Optional

class ProdutoBase(BaseModel):
    nome: str = Field(..., max_length=50)
    descricao: str = Field(..., max_length=200)
    categoria: str = Field(..., max_length=50)
    familia: str = Field(..., max_length=50)
    grupo: str = Field(..., max_length=50)
    preco: float
    imagem: Optional[str] = None
    usuario_id: int

class ProdutoCreate(ProdutoBase):
    pass

class Produto(ProdutoBase):
    id: int

    class Config:
        from_attributes = True