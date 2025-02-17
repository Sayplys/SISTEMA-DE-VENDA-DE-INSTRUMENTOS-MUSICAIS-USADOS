from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..models.produto import Produto
from ..database import get_db

router = APIRouter()

@router.post("/produtos/", response_model=Produto)
def create_produto(produto: Produto, db: Session = Depends(get_db)):
    db.add(produto)
    db.commit()
    db.refresh(produto)

    return produto

@router.get("/produtos/", response_model=list[Produto])
def get_produtos(db: Session = Depends(get_db)):
    produtos = db.query(Produto).all()

    return produtos

@router.get("/produtos/{produto_id}", response_model=Produto)
def get_produto(produto_id: int, db: Session = Depends(get_db)):
    produto = db.query(Produto).filter(Produto.id == produto_id).first()

    if not produto:
        raise HTTPException(status_code=404, detail="Produto não encontrado")
    
    return produto

@router.put("/produtos/{produto_id}", response_model=Produto)
def update_produto(produto_id: int, produto: Produto, db: Session = Depends(get_db)):
    db_produto = db.query(Produto).filter(Produto.id == produto_id).first()

    if not db_produto:
        raise HTTPException(status_code=404, detail="Produto não encontrado")
    
    db_produto.nome = produto.nome
    db_produto.descricao = produto.descricao
    db_produto.categoria = produto.categoria
    db_produto.familia = produto.familia
    db_produto.grupo = produto.grupo
    db_produto.preco = produto.preco
    db_produto.imagem = produto.imagem
    db.commit()
    db.refresh(db_produto)

    return db_produto

@router.delete("/produtos/{produto_id}", response_model=Produto)
def delete_produto(produto_id: int, db: Session = Depends(get_db)):
    db_produto = db.query(Produto).filter(Produto.id == produto_id).first()
    
    if not db_produto:
        raise HTTPException(status_code=404, detail="Produto não encontrado")
    
    db.delete(db_produto)
    db.commit()
    
    return db_produto