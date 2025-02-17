from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models.usuario import Usuario
from config.database import get_db

router = APIRouter()

@router.post("/usuarios/", response_model=Usuario)
def create_usuario(usuario: Usuario, db: Session = Depends(get_db)):
    db.add(usuario)
    db.commit()
    db.refresh(usuario)

    return usuario

@router.get("/usuarios/", response_model=list[Usuario])
def get_usuarios(db: Session = Depends(get_db)):
    usuarios = db.query(Usuario).all()

    return usuarios

@router.get("/usuarios/{usuario_id}", response_model=Usuario)
def get_usuario(usuario_id: int, db: Session = Depends(get_db)):
    usuario = db.query(Usuario).filter(Usuario.id == usuario_id).first()

    if not usuario:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    
    return usuario

@router.put("/usuarios/{usuario_id}", response_model=Usuario)
def update_usuario(usuario_id: int, usuario: Usuario, db: Session = Depends(get_db)):
    db_usuario = db.query(Usuario).filter(Usuario.id == usuario_id).first()

    if not db_usuario:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    
    db_usuario.nome = usuario.nome
    db_usuario.cpf = usuario.cpf
    db_usuario.email = usuario.email
    db_usuario.senha = usuario.senha
    db_usuario.telefone = usuario.telefone
    db_usuario.nivel_acesso = usuario.nivel_acesso
    db.commit()
    db.refresh(db_usuario)

    return db_usuario

@router.delete("/usuarios/{usuario_id}", response_model=Usuario)
def delete_usuario(usuario_id: int, db: Session = Depends(get_db)):
    db_usuario = db.query(Usuario).filter(Usuario.id == usuario_id).first()

    if not db_usuario:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    
    db.delete(db_usuario)
    db.commit()

    return db_usuario