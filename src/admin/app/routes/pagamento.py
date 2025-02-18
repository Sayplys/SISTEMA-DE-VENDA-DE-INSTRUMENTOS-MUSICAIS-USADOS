from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..models.pagamento import Pagamento as PagamentoModel
from ..schemas.pagamento import Pagamento, PagamentoCreate
from ..database import get_db

router = APIRouter()

@router.post("/pagamentos/", response_model=Pagamento)
def create_pagamento(pagamento: PagamentoCreate, db: Session = Depends(get_db)):
    db_pagamento = PagamentoModel(**pagamento.model_dump())
    db.add(db_pagamento)
    db.commit()
    db.refresh(db_pagamento)
    
    return db_pagamento

@router.get("/pagamentos/", response_model=list[Pagamento])
def get_pagamentos(db: Session = Depends(get_db)):
    return db.query(PagamentoModel).all()

@router.get("/pagamentos/{pagamento_id}", response_model=Pagamento)
def get_pagamento_by_id(pagamento_id: int, db: Session = Depends(get_db)):
    pagamento = db.query(PagamentoModel).filter(PagamentoModel.id == pagamento_id).first()

    if not pagamento:
        raise HTTPException(status_code=404, detail="Pagamento não encontrado")
    
    return pagamento

@router.put("/pagamentos/{pagamento_id}", response_model=Pagamento)
def update_pagamento(pagamento_id: int, pagamento: PagamentoCreate, db: Session = Depends(get_db)):
    db_pagamento = db.query(PagamentoModel).filter(PagamentoModel.id == pagamento_id).first()

    if not db_pagamento:
        raise HTTPException(status_code=404, detail="Pagamento não encontrado")
    
    for key, value in pagamento.model_dump().items():
        setattr(db_pagamento, key, value)
    db.commit()
    db.refresh(db_pagamento)

    return db_pagamento

@router.delete("/pagamentos/{pagamento_id}", response_model=Pagamento)
def delete_pagamento(pagamento_id: int, db: Session = Depends(get_db)):
    db_pagamento = db.query(PagamentoModel).filter(PagamentoModel.id == pagamento_id).first()

    if not db_pagamento:
        raise HTTPException(status_code=404, detail="Pagamento não encontrado")
    db.delete(db_pagamento)
    db.commit()

    return db_pagamento