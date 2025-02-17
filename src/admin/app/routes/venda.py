from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..models.venda import Venda
from ..database import get_db

router = APIRouter()

@router.post("/vendas/", response_model=Venda)
def create_venda(venda: Venda, db: Session = Depends(get_db)):
    db.add(venda)
    db.commit()
    db.refresh(venda)

    return venda

@router.get("/vendas/", response_model=list[Venda])
def get_vendas(db: Session = Depends(get_db)):
    vendas = db.query(Venda).all()

    return vendas

@router.get("/vendas/{venda_id}", response_model=Venda)
def get_venda(venda_id: int, db: Session = Depends(get_db)):
    venda = db.query(Venda).filter(Venda.id == venda_id).first()

    if not venda:
        raise HTTPException(status_code=404, detail="Venda não encontrada")
    
    return venda

@router.put("/vendas/{venda_id}", response_model=Venda)
def update_venda(venda_id: int, venda: Venda, db: Session = Depends(get_db)):
    db_venda = db.query(Venda).filter(Venda.id == venda_id).first()

    if not db_venda:
        raise HTTPException(status_code=404, detail="Venda não encontrada")
    
    db_venda.data_venda = venda.data_venda
    db_venda.valor_venda = venda.valor_venda
    db_venda.status_venda = venda.status_venda
    db_venda.usuario_id = venda.usuario_id
    db_venda.pagamento_id = venda.pagamento_id
    db.commit()
    db.refresh(db_venda)

    return db_venda

@router.delete("/vendas/{venda_id}", response_model=Venda)
def delete_venda(venda_id: int, db: Session = Depends(get_db)):
    db_venda = db.query(Venda).filter(Venda.id == venda_id).first()

    if not db_venda:
        raise HTTPException(status_code=404, detail="Venda não encontrada")
    
    db.delete(db_venda)
    db.commit()
    
    return db_venda