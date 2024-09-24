import { useDispatch } from "react-redux"
import Tabela from "../../components/ui/Tabela"
import { colunasDasComprasDoCliente } from "../../config/formulario-config"

import { useEffect, useState } from "react"
import { buscarVendaUsuarioLogado } from "../../redux/venda-slice/venda-slice"
import './styles/shopping-compras.css'

function ShoppingCompras() {
    const dispatch = useDispatch()
    const [vendas, setVendas] = useState([])

    useEffect(() => {
        dispatch(buscarVendaUsuarioLogado()).then(data => {
            // console.log(data);
            
            let vendaCustomizada = data.payload?.map(venda => {
                let vendaItem = venda.vendaItemDtos.map(item => {
                    console.log(item.produto.nome);
                    return <div className="tabela-imagem-compra">
                        <img src={item.produto.imagemUrl}/> 
                        <p>{item.produto.nome}</p>
                        <p>{item.quantidade}</p>
                    </div>
                })
                console.log('vendaItem',vendaItem);
                
                return {
                    id: venda.id,
                    produtos: vendaItem,
                    total: venda.totalvenda,
                    estado: venda.estado,
                    datacriacao: venda.datacriacao
                }
            })
            // console.log(vendaCustomizada);
            setVendas(vendaCustomizada)
            
        })
    }, [dispatch])

    return (
        <div className="shopping-compras">
            {/* {
                Object.keys(produtos).map(key =>  Object.keys(produtos[key]).map(item => console.log(produtos[key][item])) 
                )
            } */}
            <div className="cabelhaco-compras">
                <h2>Compras</h2>
            </div>

            <Tabela colunas={colunasDasComprasDoCliente} dados={vendas}/>
        </div>
    )
}

export default ShoppingCompras