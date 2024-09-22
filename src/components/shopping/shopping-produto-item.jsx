import { ShoppingCart } from "lucide-react"

import Botao from '../ui/Botao'
import './styles/shopping-produto-item.css'

function ShoppingProdutoItem({produto, onSubmit}) {

    return(
        <div className="cartao">
            <div className="imagem">
                <img src={produto?.imagemUrl} alt="" width={600} />
                <Botao onClick={() => onSubmit(produto)} className='botaoCustomizado'><ShoppingCart className="icon"/> Adicionar no Carrinho</Botao>
            </div>
            <div className="informacao">
                <p>{produto.nome}</p>
                <p>R${produto.preco}</p>
            </div>
            <div className="descricao">
                <p>{produto.descricao}</p>
            </div>
        </div>
    )
}

export default ShoppingProdutoItem 