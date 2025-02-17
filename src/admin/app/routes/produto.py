from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..models.produto import Produto as ProdutoModel
from ..schemas.produto import Produto, ProdutoCreate
from ..database import get_db

router = APIRouter()

@router.post("/produtos/", response_model=Produto)
def create_produto(produto: ProdutoCreate, db: Session = Depends(get_db)):
    db_produto = ProdutoModel(**produto.model_dump())
    db.add(db_produto)
    db.commit()
    db.refresh(db_produto)

    return db_produto

@router.get("/produtos/", response_model=list[Produto])
def get_produtos(db: Session = Depends(get_db)):
    produtos = db.query(ProdutoModel).all()

    return produtos

@router.get("/produtos/{produto_id}", response_model=Produto)
def get_produto_by_id(produto_id: int, db: Session = Depends(get_db)):
    produto = db.query(ProdutoModel).filter(ProdutoModel.id == produto_id).first()

    if not produto:
        raise HTTPException(status_code=404, detail="Produto não encontrado")
    
    return produto

@router.put("/produtos/{produto_id}", response_model=Produto)
def update_produto(produto_id: int, produto: ProdutoCreate, db: Session = Depends(get_db)):
    db_produto = db.query(ProdutoModel).filter(ProdutoModel.id == produto_id).first()

    if not db_produto:
        raise HTTPException(status_code=404, detail="Produto não encontrado")
    
    for key, value in produto.model_dump().items():
        setattr(db_produto, key, value)
    
    db.commit()
    db.refresh(db_produto)

    return db_produto

@router.delete("/produtos/{produto_id}", response_model=Produto)
def delete_produto(produto_id: int, db: Session = Depends(get_db)):
    db_produto = db.query(ProdutoModel).filter(ProdutoModel.id == produto_id).first()

    if not db_produto:
        raise HTTPException(status_code=404, detail="Produto não encontrado")
    
    db.delete(db_produto)
    db.commit()

    return db_produto