import ShoppingMenu from '../../components/shopping/shopping-menu';
import ShoppingProdutoItem from '../../components/shopping/shopping-produto-item';

import './styles/shopping-home.css';

function ShoppingHome() {

    const produto = {
        "id": 15,
        "nome": "Tênis Grand Court Alpha",
        "descricao": "Tênis Grand Court Alpha",
        "preco": 400,
        "quantidade": 100,
        "estado": true,
        "datacriacao": "2024-09-14T20:14:35",
        "ultimaAlteracao": "2024-09-14T20:14:35",
        "imagemUrl": "https://storage.googleapis.com/condominio-foto/aad1bbcb-45bd-4490-8cb5-e674ad4a12d4.avif",
        "marca": "Adidas",
        "categoria": "Calçado",
        "usuario": "Quitumba Culissander Cordeiro Ferreira"
    }

    const produtos = [produto, produto, produto, produto, produto]

    function onSubmit() {
        
    }

    return (
        <>
            <div> 
                <ShoppingMenu />
            </div>
            <div className='home-produto'>
                {
                    produtos && produtos.length > 0 ? 
                        produtos.map(produto => <ShoppingProdutoItem key={produto.id} produto={produto} />)
                    : null
                }
                
            </div>
        </>
    )
}

export default ShoppingHome;