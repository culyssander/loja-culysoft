import { Link } from "react-router-dom"

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Formulario from '../../components/common/formulario'
import ShoppingCarrinho from "../../components/shopping/shopping-carrinho"
import { moradaDeEntrega, pagamentoDoCompra } from "../../config/formulario-config"
import './styles/shopping-checkout.css'

const estadoInicialDoFormularioMorada = {
    rua: '',
    numero: '',
    complemento: ''
}

const estadoInicialDoFormularioPagamento = {
    numeroCartao: '',
    expiracao: '',
    cvc: '',
    nome: ''
}

function ShoppingCheckout() {

    const {produtos} = useSelector(state => state.carrinhos)
    const [formularioDataMorada, setFormularioDataMorada] = useState(estadoInicialDoFormularioMorada)
    const [formularioDataPagamento, setFormularioDataPagamento] = useState(estadoInicialDoFormularioPagamento)
    const [morada, setMorada] = useState(null)
    const [total, setTotal] = useState(0)
    const [estaVisivel, setEstaVisivel] = useState(false)

    useEffect(() => {
        let resultado = produtos.reduce((valor, produto) => valor + (produto.preco * produto.quantidade), 0)
        setTotal(resultado)
    }, [produtos])

    function editarCompras() {
        setEstaVisivel(true)
    }

    function submitFormularioMorada() {

    }

    function submitFormularioPagamento() {
        
    }

    return (
        <>
            <div className="shopping-checkout">
                
                <div className="checkout">
                <h1>Checkout</h1>
                    <div className="checkout-endereco">
                        {
                            morada === null ? 
                            <div>
                                <h2>Endereço</h2>
                                <Formulario
                                    formularioControl={moradaDeEntrega}
                                    setFormularioDados={setFormularioDataMorada}
                                    formularioDados={formularioDataMorada}
                                    onSubmit={submitFormularioMorada}
                                    textoDoBotao='Salvar'
                                />
                            </div> : 
                            <div>
                                <div className="morada-editar">
                                    <h2>Endereço</h2>
                                    <Link>Editar</Link>
                                </div>
                                <div className="morada-info">
                                    <p>{morada?.rua} {morada?.numero}</p>
                                    <p>{morada?.complemento}</p>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="checkout-pagamento">
                        <h2>Forma de pagamento</h2>
                        <div className="paypal">
                            <Link >PAY PAL</Link>
                        </div>
                        <p>ou</p>
                        <Formulario 
                            formularioControl={pagamentoDoCompra}
                            formularioDados={formularioDataPagamento}
                            setFormularioDados={setFormularioDataPagamento}
                            textoDoBotao='Pagamento'
                            onSubmit={submitFormularioPagamento}
                        />
                    </div>
                </div>
                <div className="carrinho">
                    <div>
                        <div className="editar">
                            <h2>Carrinho de compras</h2>
                            <Link onClick={editarCompras} >Editar</Link>
                            {
                                estaVisivel && <ShoppingCarrinho estaVisivel={estaVisivel} setEstaVisivel={setEstaVisivel}/>
                            }
                        </div>
                        <div className="entraga">
                            <p>Entraga</p>
                            <p>R$0.00</p>
                        </div>
                        <div className="total">
                            <p>Total</p>
                            <p>R$ {total}</p>
                        </div>
                    </div>
                    <div className="descricao-produtos">
                        {
                            produtos && produtos.length > 0 ? 
                            <table>
                                {
                                    produtos.map(produto =>
                                        <tr>
                                            <td>{produto.nome}</td>
                                            <td>{produto.quantidade}</td>
                                            <td>{produto.preco}</td>
                                        </tr>
                                    )
                                }
                            </table>: null
                        }
                        
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default ShoppingCheckout