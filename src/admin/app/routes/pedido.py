from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..models.pedido import Pedido as PedidoModel
from ..schemas.pedido import Pedido, PedidoCreate
from ..database import get_db

router = APIRouter()

@router.post("/pedidos/", response_model=Pedido)
def create_pedido(pedido: PedidoCreate, db: Session = Depends(get_db)):
    db_pedido = PedidoModel(**pedido.model_dump())
    db.add(db_pedido)
    db.commit()
    db.refresh(db_pedido)
    
    return db_pedido

@router.get("/pedidos/", response_model=list[Pedido])
def get_pedidos(db: Session = Depends(get_db)):
    return db.query(PedidoModel).all()

@router.get("/pedidos/{pedido_id}", response_model=Pedido)
def get_pedido_by_id(pedido_id: int, db: Session = Depends(get_db)):
    pedido = db.query(PedidoModel).filter(PedidoModel.id == pedido_id).first()

    if not pedido:
        raise HTTPException(status_code=404, detail="Pedido não encontrado")
    
    return pedido

@router.put("/pedidos/{pedido_id}", response_model=Pedido)
def update_pedido(pedido_id: int, pedido: PedidoCreate, db: Session = Depends(get_db)):
    db_pedido = db.query(PedidoModel).filter(PedidoModel.id == pedido_id).first()

    if not db_pedido:
        raise HTTPException(status_code=404, detail="Pedido não encontrado")
    
    for key, value in pedido.model_dump().items():
        setattr(db_pedido, key, value)
    db.commit()
    db.refresh(db_pedido)

    return db_pedido

@router.delete("/pedidos/{pedido_id}", response_model=Pedido)
def delete_pedido(pedido_id: int, db: Session = Depends(get_db)):
    db_pedido = db.query(PedidoModel).filter(PedidoModel.id == pedido_id).first()

    if not db_pedido:
        raise HTTPException(status_code=404, detail="Pedido não encontrado")
    db.delete(db_pedido)
    db.commit()

    return db_pedido
