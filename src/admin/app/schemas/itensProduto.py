from pydantic import BaseModel, Field

class ItensProdutoBase(BaseModel):
    fk_id_pedido: int
    fk_id_produto: int
    quantidade: int = Field(..., gt=0)

class ItensProdutoCreate(ItensProdutoBase):
    pass

class ItensProduto(ItensProdutoBase):
    id: int

    class Config:
        from_attributes = True