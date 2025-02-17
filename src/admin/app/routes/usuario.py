from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..models.usuario import Usuario as UsuarioModel
from ..schemas.usuario import Usuario, UsuarioCreate
from ..database import get_db

router = APIRouter()

@router.post("/usuarios/", response_model=Usuario)
def create_usuario(usuario: UsuarioCreate, db: Session = Depends(get_db)):
    db_usuario = UsuarioModel(**usuario.model_dump())
    db.add(db_usuario)
    db.commit()
    db.refresh(db_usuario)

    return db_usuario

@router.get("/usuarios/", response_model=list[Usuario])
def get_usuarios(db: Session = Depends(get_db)):
    usuarios = db.query(UsuarioModel).all()

    return usuarios

@router.get("/usuarios/{usuario_id}", response_model=Usuario)
def get_usuario_by_id(usuario_id: int, db: Session = Depends(get_db)):
    usuario = db.query(UsuarioModel).filter(UsuarioModel.id == usuario_id).first()

    if not usuario:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    
    return usuario

@router.put("/usuarios/{usuario_id}", response_model=Usuario)
def update_usuario(usuario_id: int, usuario: UsuarioCreate, db: Session = Depends(get_db)):
    db_usuario = db.query(UsuarioModel).filter(UsuarioModel.id == usuario_id).first()
    if not db_usuario:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    
    for key, value in usuario.model_dump().items():  # Usando model_dump() no Pydantic V2
        setattr(db_usuario, key, value)
    
    db.commit()
    db.refresh(db_usuario)

    return db_usuario

@router.delete("/usuarios/{usuario_id}", response_model=Usuario)
def delete_usuario(usuario_id: int, db: Session = Depends(get_db)):
    db_usuario = db.query(UsuarioModel).filter(UsuarioModel.id == usuario_id).first()
    if not db_usuario:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    
    db.delete(db_usuario)
    db.commit()

    return db_usuario