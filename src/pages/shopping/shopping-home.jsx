import { useDispatch, useSelector } from 'react-redux';
import ShoppingMenu from '../../components/shopping/shopping-menu';
import ShoppingProdutoItem from '../../components/shopping/shopping-produto-item';

import { useEffect } from 'react';
import { adicionarProdutoNoCarrinho } from '../../redux/carrinho-slice/carrinho-slice';
import { buscaTodosProdutos } from '../../redux/produto-slice/produto-slice';
import './styles/shopping-home.css';

function ShoppingHome() {

    const {produtos} = useSelector(state => state.produtos)
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(buscaTodosProdutos(null))
    }, [dispatch])

    function onSubmit(produto) {
        dispatch(adicionarProdutoNoCarrinho(produto))
    }

    return (
        <>
            <div> 
                <ShoppingMenu />
            </div>
            <div className='home-produto'>
                {
                    produtos && produtos.length > 0 ?
                        produtos.map(produto => <ShoppingProdutoItem key={produto.id} produto={produto} onSubmit={onSubmit} />)
                    : null
                }
                
            </div>
        </>
    )
}

export default ShoppingHome;