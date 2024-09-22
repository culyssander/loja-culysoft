import { CircleX, Minus, Plus } from "lucide-react"

import { useDispatch, useSelector } from "react-redux"
import { aumentarQuantidadeDoProdutoNoCarrinho, diminuirQuantidadeDoProdutoNoCarrinho, removerProdutoDoCarrinho } from "../../redux/carrinho-slice/carrinho-slice"
import './styles/shopping-carrinho-item.css'

function ShoppingCarrinhoItem({produto}) {

    const dispatch = useDispatch()
    const {produtos} = useSelector(state => state.carrinhos)
    
    function diminuirQuantidadeDoProduto() {
        dispatch(diminuirQuantidadeDoProdutoNoCarrinho(produto))
    }

    function aumentaQuantidadeDoProduto() {
        dispatch(aumentarQuantidadeDoProdutoNoCarrinho(produto))
    }

    function removerProdutoCarrinho() {
        dispatch(removerProdutoDoCarrinho(produto.id))
        if (produtos.length === 1) sessionStorage.removeItem('produtos')
    }

    return(
        <div className="carrinho-item-container">
            <img src={produto.imagemUrl} alt="" />
            <div className="informacao">
                <p className="titulo">{produto.nome}</p>
                <p>R${produto.preco}</p>
                <div className="quantidade">
                    <Minus className="sinal"  onClick={diminuirQuantidadeDoProduto}/>  
                    <p>{produto.quantidade}</p>
                    <Plus className="sinal"  onClick={aumentaQuantidadeDoProduto} />
                    <div className="remover">
                    <CircleX className="ciclo" onClick={removerProdutoCarrinho} /> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShoppingCarrinhoItem