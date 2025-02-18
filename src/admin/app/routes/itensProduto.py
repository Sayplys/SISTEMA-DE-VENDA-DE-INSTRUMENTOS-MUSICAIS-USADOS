from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..models.itensProduto import ItensProduto as ItensProdutoModel
from ..schemas.itensProduto import ItensProduto, ItensProdutoCreate
from ..database import get_db

router = APIRouter()

@router.post("/itens-produto/", response_model=ItensProduto)
def create_itens_produto(itens_produto: ItensProdutoCreate, db: Session = Depends(get_db)):
    db_itens_produto = ItensProdutoModel(**itens_produto.model_dump())
    db.add(db_itens_produto)
    db.commit()
    db.refresh(db_itens_produto)
    
    return db_itens_produto

@router.get("/itens-produto/", response_model=list[ItensProduto])
def get_itens_produto(db: Session = Depends(get_db)):
    return db.query(ItensProdutoModel).all()

@router.get("/itens-produto/{itens_produto_id}", response_model=ItensProduto)
def get_itens_produto_by_id(itens_produto_id: int, db: Session = Depends(get_db)):
    itens_produto = db.query(ItensProdutoModel).filter(ItensProdutoModel.id == itens_produto_id).first()

    if not itens_produto:
        raise HTTPException(status_code=404, detail="Item do produto não encontrado")
    
    return itens_produto

@router.put("/itens-produto/{itens_produto_id}", response_model=ItensProduto)
def update_itens_produto(itens_produto_id: int, itens_produto: ItensProdutoCreate, db: Session = Depends(get_db)):
    db_itens_produto = db.query(ItensProdutoModel).filter(ItensProdutoModel.id == itens_produto_id).first()

    if not db_itens_produto:
        raise HTTPException(status_code=404, detail="Item do produto não encontrado")
    
    for key, value in itens_produto.model_dump().items():
        setattr(db_itens_produto, key, value)
    db.commit()
    db.refresh(db_itens_produto)

    return db_itens_produto

@router.delete("/itens-produto/{itens_produto_id}", response_model=ItensProduto)
def delete_itens_produto(itens_produto_id: int, db: Session = Depends(get_db)):
    db_itens_produto = db.query(ItensProdutoModel).filter(ItensProdutoModel.id == itens_produto_id).first()

    if not db_itens_produto:
        raise HTTPException(status_code=404, detail="Item do produto não encontrado")
    db.delete(db_itens_produto)
    db.commit()

    return db_itens_produto
