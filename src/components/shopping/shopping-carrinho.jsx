
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ShoppingCarrinhoItem from './shopping-carrinho-item';
import './styles/shopping-carrinho.css';

function ShoppingCarrinho({estaVisivel, setEstaVisivel}) {

    const { produtos } = useSelector(state => state.carrinhos)
    const { estaLogado, usuario } = useSelector(state => state.auth)
    const navegate = useNavigate()

    const [total, setTotal] = useState(0)

    function checkout() {
        if (!estaLogado) return navegate('/auth/login')
        if (usuario?.perfil === 'ADMIN') return navegate('./nao-autorizado')
        
        return navegate('/shop/checkout')
    }

    useEffect(() => {
        let resultado = produtos.reduce((valor, produto) => valor + (produto.quantidade * produto.preco), 0)
        setTotal(resultado)
    }, [produtos])

    return (
        <div>
            {
                estaVisivel && 
                <div className="carrinho-container">
                    <div className="area-carrinho" onClick={() => setEstaVisivel(false)}></div>
                    <div className="carrinho-conteudo">
                        
                        <div className="carrinho-titulo">Seu Carrinho</div>
                        {
                            produtos && produtos.length > 0 ? produtos.map(produto => <ShoppingCarrinhoItem produto={produto}/>) : null
                        }
                        <div aria-disabled={true} className={`carrinho-total`}>Total R$ {total}</div>
                        <button onClick={checkout} className='carrinho-botao-checkout'>Checkout</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default ShoppingCarrinho