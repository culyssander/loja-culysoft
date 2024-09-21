import Tabela from "../../components/ui/Tabela"

function ShoppingCompras() {
    const produto = {
        nome: 'Tenis',
        preco: 400
    }
    const produtos = [produto, produto]
    const colunas = ['Produto', 'preco']

    return (
        <div>ShoppingCompras
            {/* {
                Object.keys(produtos).map(key =>  Object.keys(produtos[key]).map(item => console.log(produtos[key][item])) 
                )
            } */}

            <Tabela colunas={colunas} dados={produtos}/>
        </div>
    )
}

export default ShoppingCompras