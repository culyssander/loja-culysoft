function ShoppingCarrinhoItem({produto}) {
    
    function diminuirQuantidadeDoProduto() {

    }

    function aumentaQuantidadeDoProduto() {
        
    }

    function removerProdutoCarrinho() {
        
    }

    return(
        <div className="carrinho-item-container">
            <img src={produto.imagemUrl} alt="" />
            <div className="informacao">
                <p className="titulo">{produto.nome}</p>
                <p>R${produto.price}</p>
                <div className="quantidade">
                    <AiOutlineMinus onClick={diminuirQuantidadeDoProduto} /> 
                    <p>{produto.quantity}</p>
                    <AiOutlinePlus onClick={aumentaQuantidadeDoProduto}/>
                    <div className="remover">
                        <AiOutlineClose onClick={removerProdutoCarrinho}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShoppingCarrinhoItem