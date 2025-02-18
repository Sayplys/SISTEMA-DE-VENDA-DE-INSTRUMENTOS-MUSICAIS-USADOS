from pydantic import BaseModel, Field, field_validator
from typing import Optional

class UsuarioBase(BaseModel):
    nome: Optional[str] = Field(..., max_length=50)
    cpf: str = Field(..., max_length=11)
    email: str = Field(..., max_length=50)
    senha: str = Field(..., max_length=100)
    telefone: str = Field(..., max_length=20)
    nivel_acesso: str = Field(..., max_length=10)

    @field_validator('cpf')
    def validar_cpf(cls, value):
        if len(value) != 11:
            raise ValueError("CPF deve ter 11 caracteres")
        return value

    @field_validator('email')
    def validar_email(cls, value):
        if "@" not in value:
            raise ValueError("Email inválido")
        return value

class UsuarioCreate(UsuarioBase):
    pass

class Usuario(UsuarioBase):
    id: int

    class Config:
        from_attributes = True