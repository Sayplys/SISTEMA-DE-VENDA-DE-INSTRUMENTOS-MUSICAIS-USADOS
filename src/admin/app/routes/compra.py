from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..models.compra import Compra as CompraModel
from ..schemas.compra import Compra, CompraCreate
from ..database import get_db

router = APIRouter()

@router.post("/compras/", response_model=Compra)
def create_compra(compra: CompraCreate, db: Session = Depends(get_db)):
    db_compra = CompraModel(**compra.model_dump())
    db.add(db_compra)
    db.commit()
    db.refresh(db_compra)
    
    return db_compra

@router.get("/compras/", response_model=list[Compra])
def get_compras(db: Session = Depends(get_db)):
    compras = db.query(CompraModel).all()

    return compras

@router.get("/compras/{compra_id}", response_model=Compra)
def get_compra_by_id(compra_id: int, db: Session = Depends(get_db)):
    compra = db.query(CompraModel).filter(CompraModel.id == compra_id).first()

    if not compra:
        raise HTTPException(status_code=404, detail="Compra não encontrada")
    
    return compra

@router.put("/compras/{compra_id}", response_model=Compra)
def update_compra(compra_id: int, compra: CompraCreate, db: Session = Depends(get_db)):
    db_compra = db.query(CompraModel).filter(CompraModel.id == compra_id).first()

    if not db_compra:
        raise HTTPException(status_code=404, detail="Compra não encontrada")
    
    for key, value in compra.model_dump().items():
        setattr(db_compra, key, value)
    db.commit()
    db.refresh(db_compra)

    return db_compra

@router.delete("/compras/{compra_id}", response_model=Compra)
def delete_compra(compra_id: int, db: Session = Depends(get_db)):
    db_compra = db.query(CompraModel).filter(CompraModel.id == compra_id).first()

    if not db_compra:
        raise HTTPException(status_code=404, detail="Compra não encontrada")
    db.delete(db_compra)
    db.commit()

    return db_compra