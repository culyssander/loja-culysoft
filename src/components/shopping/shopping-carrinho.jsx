
import { useState } from 'react';
import './styles/shopping-carrinho.css';

function ShoppingCarrinho({estaVisivel, setEstaVisivel}) {

    const [total, setTotal] = useState(0)

    return (
        <div>
            {
                estaVisivel && 
                <div className="carrinho-container">
                    <div className="area-carrinho" onClick={() => setEstaVisivel(false)}></div>
                    <div className="carrinho-conteudo">
                        
                        <div className="carrinho-titulo">Seu Carrinho</div>
                        {/* {
                            produtos && produtos.length > 0 ? produtos.map(produto => <ShoppingCarrinhoItem produto={produto}/>) : null
                        } */}
                        <div aria-disabled={true} className={`carrinho-total`}>Total R$ {total}</div>
                    </div>
                </div>
            }
        </div>
    )
}

export default ShoppingCarrinho