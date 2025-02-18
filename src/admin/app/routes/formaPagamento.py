from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..models.formaPagamento import FormaPagamento as FormaPagamentoModel
from ..schemas.formaPagamento import FormaPagamento, FormaPagamentoCreate
from ..database import get_db

router = APIRouter()

@router.post("/formas-pagamento/", response_model=FormaPagamento)
def create_forma_pagamento(forma_pagamento: FormaPagamentoCreate, db: Session = Depends(get_db)):
    db_forma_pagamento = FormaPagamentoModel(**forma_pagamento.model_dump())
    db.add(db_forma_pagamento)
    db.commit()
    db.refresh(db_forma_pagamento)
    
    return db_forma_pagamento

@router.get("/formas-pagamento/", response_model=list[FormaPagamento])
def get_formas_pagamento(db: Session = Depends(get_db)):
    formas_pagamento = db.query(FormaPagamentoModel).all()

    return formas_pagamento

@router.get("/formas-pagamento/{forma_pagamento_id}", response_model=FormaPagamento)
def get_forma_pagamento_by_id(forma_pagamento_id: int, db: Session = Depends(get_db)):
    forma_pagamento = db.query(FormaPagamentoModel).filter(FormaPagamentoModel.id == forma_pagamento_id).first()

    if not forma_pagamento:
        raise HTTPException(status_code=404, detail="Forma de pagamento não encontrada")
    
    return forma_pagamento

@router.put("/formas-pagamento/{forma_pagamento_id}", response_model=FormaPagamento)
def update_forma_pagamento(forma_pagamento_id: int, forma_pagamento: FormaPagamentoCreate, db: Session = Depends(get_db)):
    db_forma_pagamento = db.query(FormaPagamentoModel).filter(FormaPagamentoModel.id == forma_pagamento_id).first()

    if not db_forma_pagamento:
        raise HTTPException(status_code=404, detail="Forma de pagamento não encontrada")
    
    for key, value in forma_pagamento.model_dump().items():
        setattr(db_forma_pagamento, key, value)
    db.commit()
    db.refresh(db_forma_pagamento)

    return db_forma_pagamento

@router.delete("/formas-pagamento/{forma_pagamento_id}", response_model=FormaPagamento)
def delete_forma_pagamento(forma_pagamento_id: int, db: Session = Depends(get_db)):
    db_forma_pagamento = db.query(FormaPagamentoModel).filter(FormaPagamentoModel.id == forma_pagamento_id).first()

    if not db_forma_pagamento:
        raise HTTPException(status_code=404, detail="Forma de pagamento não encontrada")
    db.delete(db_forma_pagamento)
    db.commit()

    return db_forma_pagamento