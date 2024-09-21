import { Link } from "react-router-dom"

import { useState } from "react"
import Formulario from '../../components/common/formulario'
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

    const [formularioDataMorada, setFormularioDataMorada] = useState(estadoInicialDoFormularioMorada)
    const [formularioDataPagamento, setFormularioDataPagamento] = useState(estadoInicialDoFormularioPagamento)
    const [morada, setMorada] = useState({
        rua: 'Rua Quitumba Ferreira',
        numero: 400,
        complemento: 'apt 03'
    })

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
                            <Link>Editar</Link>
                        </div>
                        <div className="entraga">
                            <p>Entraga</p>
                            <p>R$0.00</p>
                        </div>
                        <div className="total">
                            <p>Total</p>
                            <p>R$1345</p>
                        </div>
                    </div>
                    <div className="descricao-produtos">
                        <div>
                            <p>Nome do produto</p>
                            <p>quantidade</p>
                            <p>preco</p>
                        </div>
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default ShoppingCheckout