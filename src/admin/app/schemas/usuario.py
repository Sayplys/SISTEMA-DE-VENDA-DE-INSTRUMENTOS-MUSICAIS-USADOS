from pydantic import BaseModel, Field
from typing import Optional

class UsuarioBase(BaseModel):
    nome: Optional[str] = Field(..., max_length=50)
    cpf: str = Field(..., max_length=11)
    email: str = Field(..., max_length=50)
    senha: str = Field(..., max_length=100)
    telefone: str = Field(..., max_length=20)
    nivel_acesso: str = Field(..., max_length=10)

class UsuarioCreate(UsuarioBase):
    pass

class Usuario(UsuarioBase):
    id: int

    class Config:
        from_attributes = True