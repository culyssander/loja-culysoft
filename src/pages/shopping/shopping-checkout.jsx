import { Link, useNavigate, useSearchParams } from "react-router-dom"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Formulario from '../../components/common/formulario'
import ShoppingCarrinho from "../../components/shopping/shopping-carrinho"
import { moradaDeEntrega, pagamentoDoCompra } from "../../config/formulario-config"
// import { buscaMoradaPeloUsuarioLogado } from "../../redux/morada-slice/morada-slice"
import { actualizarPagina } from "../../redux/carrinho-slice/carrinho-slice"
import { buscaMoradaPeloUsuarioLogado, salvarMoradaPeloUsuarioLogado } from "../../redux/morada-slice/morada-slice"
import { salvarPagamento } from "../../redux/pagamento-slice/pagamento-slice"
import { salvarVenda } from "../../redux/venda-slice/venda-slice"
import { toastErro, toastInformacao, toastSucesso } from '../../utils/toasters'
import { verificaInput } from "../../utils/verificacao"
import './styles/shopping-checkout.css'

const estadoInicialDoFormularioMorada = {
    id: '',
    rua: '',
    cep: '',
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
    const {usuario} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navegate = useNavigate()
    const [searchParams] = useSearchParams();
    const [formularioDataMorada, setFormularioDataMorada] = useState(estadoInicialDoFormularioMorada)
    const [formularioDataPagamento, setFormularioDataPagamento] = useState(estadoInicialDoFormularioPagamento)
    const [morada, setMorada] = useState(null)
    const [total, setTotal] = useState(0)
    const [estaVisivel, setEstaVisivel] = useState(false)
    const [vendaId, setVendaId] = useState('')

    

    useEffect(() => {
        let resultado = produtos.reduce((valor, produto) => valor + (produto.preco * produto.quantidade), 0)
        setTotal(resultado)
    }, [produtos])

    useEffect(() => {
        dispatch(buscaMoradaPeloUsuarioLogado()).then(data => {
            if (data.payload?.id) 
                setMorada(data.payload)
            else
                setMorada(null)
        })
    }, [dispatch])

    function editarCompras() {
        setEstaVisivel(true)
    }

    const { rua, numero } = formularioDataMorada
    const { numeroCartao, expiracao, cvc, nome } = formularioDataPagamento

    function submitFormularioMorada(event) {
        event.preventDefault()

        if (verificaInput(rua) || verificaInput(numero)) return toastInformacao("Morada são campos obrigatorios")

        dispatch(salvarMoradaPeloUsuarioLogado(formularioDataMorada)).then(data => {
            console.log(data)            
            if (data.payload?.id) 
                setMorada(data.payload)
            else
                toastErro('Error ao registar morada')
        })
    }

    function submitFormularioPagamento(event) {
        event.preventDefault()

        if(verificaInput(nome) || verificaInput(numeroCartao) || verificaInput(expiracao) || verificaInput(cvc)) return toastInformacao('Campos obrigatorios')

        dispatch(salvarPagamento(formularioDataPagamento)).then(data => {
            if (data.payload?.numeroCartao) {
                let vendaItem = produtos.map(({estado, datacriacao, ultimaAlteracao, usuario, ...produtos}) => produtos)
                
                vendaItem = vendaItem.map(({quantidade, ...item}) => {
                    return {
                        produto: {...item},
                        quantidade: quantidade,
                        preco: item.preco,
                        total: item.preco * quantidade
                    }
                })

                const venda = {
                    totalvenda: total,
                    totalpago: total,
                    desconto: 0,
                    usuarioNome: usuario?.nome,
                    pagamentoId: data.payload?.id,
                    estado: data.payload?.estado ? 'PAGO': 'FALHA',
                    vendaItemDtos: vendaItem
                }
                
                dispatch(salvarVenda(venda)).then(data => {
                    sessionStorage.removeItem('produtos')
                    
                    if (data.payload?.id) {
                        sessionStorage.setItem('vendaId', data.payload?.id)
                    }
                })
                sessionStorage.removeItem('produtos')
                dispatch(actualizarPagina())
                
                toastSucesso('Venda realizado com sucesso!')
                navegate('/shop/obrigado')
                setFormularioDataMorada(estadoInicialDoFormularioPagamento)
            } else {
                toastErro('Error na venda')
            }
            console.log(data);
        })
    }

    function abrirFormularioMorada() {
        setMorada(null)
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
                                    <Link onClick={abrirFormularioMorada}>Editar</Link>
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