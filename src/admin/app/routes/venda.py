from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..models.venda import Venda as VendaModel
from ..schemas.venda import Venda, VendaCreate
from ..database import get_db

router = APIRouter()

@router.post("/vendas/", response_model=Venda)
def create_venda(venda: VendaCreate, db: Session = Depends(get_db)):
    db_venda = VendaModel(**venda.model_dump())  # Usando model_dump() no Pydantic V2
    db.add(db_venda)
    db.commit()
    db.refresh(db_venda)
    
    return db_venda

@router.get("/vendas/", response_model=list[Venda])
def get_vendas(db: Session = Depends(get_db)):
    vendas = db.query(VendaModel).all()

    return vendas

@router.get("/vendas/{venda_id}", response_model=Venda)
def get_venda(venda_id: int, db: Session = Depends(get_db)):
    venda = db.query(VendaModel).filter(VendaModel.id == venda_id).first()

    if not venda:
        raise HTTPException(status_code=404, detail="Venda não encontrada")
    
    return venda

@router.put("/vendas/{venda_id}", response_model=Venda)
def update_venda(venda_id: int, venda: VendaCreate, db: Session = Depends(get_db)):
    db_venda = db.query(VendaModel).filter(VendaModel.id == venda_id).first()

    if not db_venda:
        raise HTTPException(status_code=404, detail="Venda não encontrada")
    
    for key, value in venda.model_dump().items():  # Usando model_dump() no Pydantic V2
        setattr(db_venda, key, value)
    
    db.commit()
    db.refresh(db_venda)

    return db_venda

@router.delete("/vendas/{venda_id}", response_model=Venda)
def delete_venda(venda_id: int, db: Session = Depends(get_db)):
    db_venda = db.query(VendaModel).filter(VendaModel.id == venda_id).first()
    if not db_venda:
        raise HTTPException(status_code=404, detail="Venda não encontrada")
    
    db.delete(db_venda)
    db.commit()

    return db_venda