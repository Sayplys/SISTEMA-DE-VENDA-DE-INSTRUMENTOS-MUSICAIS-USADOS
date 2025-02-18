from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..models.endereco import Endereco as EnderecoModel
from ..schemas.endereco import Endereco, EnderecoCreate
from ..database import get_db

router = APIRouter()

@router.post("/enderecos/", response_model=Endereco)
def create_endereco(endereco: EnderecoCreate, db: Session = Depends(get_db)):
    db_endereco = EnderecoModel(**endereco.model_dump())
    db.add(db_endereco)
    db.commit()
    db.refresh(db_endereco)
    
    return db_endereco

@router.get("/enderecos/", response_model=list[Endereco])
def get_enderecos(db: Session = Depends(get_db)):
    enderecos = db.query(EnderecoModel).all()

    return enderecos

@router.get("/enderecos/{endereco_id}", response_model=Endereco)
def get_endereco_by_id(endereco_id: int, db: Session = Depends(get_db)):
    endereco = db.query(EnderecoModel).filter(EnderecoModel.id == endereco_id).first()

    if not endereco:
        raise HTTPException(status_code=404, detail="Endereço não encontrado")
    
    return endereco

@router.put("/enderecos/{endereco_id}", response_model=Endereco)
def update_endereco(endereco_id: int, endereco: EnderecoCreate, db: Session = Depends(get_db)):
    db_endereco = db.query(EnderecoModel).filter(EnderecoModel.id == endereco_id).first()

    if not db_endereco:
        raise HTTPException(status_code=404, detail="Endereço não encontrado")
    
    for key, value in endereco.model_dump().items():
        setattr(db_endereco, key, value)
    db.commit()
    db.refresh(db_endereco)

    return db_endereco

@router.delete("/enderecos/{endereco_id}", response_model=Endereco)
def delete_endereco(endereco_id: int, db: Session = Depends(get_db)):
    db_endereco = db.query(EnderecoModel).filter(EnderecoModel.id == endereco_id).first()

    if not db_endereco:
        raise HTTPException(status_code=404, detail="Endereço não encontrado")
    db.delete(db_endereco)
    db.commit()

    return db_endereco