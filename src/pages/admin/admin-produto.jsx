import { BadgeDollarSign, Calculator, Pencil, ShoppingBasket, Trash2 } from "lucide-react"

import { Link } from "react-router-dom"
import Botao from '../../components/ui/Botao'
import './styles/admin-produto.css'

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Formulario from "../../components/common/formulario"
import { CONSTANTES } from "../../config/constantes"
import { contraladorDoFormularioAdminProduto } from "../../config/formulario-config"
import imagemIndisponivel from '../../img/indisponivel.jpg'
import { buscaTodosProdutos, removerProduto, salvaProduto } from "../../redux/produto-slice/produto-slice"
import { toastErro, toastInformacao, toastSucesso } from "../../utils/toasters"
import { localizacao, verificaInput, verificaInput2 } from "../../utils/verificacao"

import CarregarImage from '../../components/ui/CarregarImagem'
import { buscaTodasCategorias } from '../../redux/categoria-slice/categoria-slice'
import { buscaTodasMarcas } from '../../redux/marca-slice/marca-slice'

const estadoInicialDoFormulario = {
    id: '',
    nome: '',
    descricao: '',
    categoria: '',
    marca: '',
    preco: '',
    quantidade: '',
    ultimaAlteracao: '',
    imagemUrl: '',
    usuario: '',
    datacriacao: '',
    estado: true
}

let produtoTemp = undefined

function ProdutoCard({produto, setProdutosFiltro, setAbrirFormulario, setFormularioDados }) {

    const dispatch = useDispatch()

    function editarProduto() {
        // setFormularioDados(produto)
        setAbrirFormulario(true)
        produtoTemp = produto
        console.log(produtoTemp);
        
    }

    function removeProduto () {
        dispatch(removerProduto(produto.id)).then(data => {
            if (data?.payload === true) {
                dispatch(buscaTodosProdutos(null)).then(data => setProdutosFiltro(data.payload))
                toastSucesso('Produto removido com sucesso')
            } else {
                toastErro('Erro ao remover o produto')
            }
        })
    }

    return(
        <div className="shoppin-produto-card">
            <div className="imagem-produto">
                <img src={produto?.imagemUrl ? produto?.imagemUrl : imagemIndisponivel} alt={produto.nome} width={400} />
                
            </div>
            <div className="descricao">
                <h2>{produto.nome}</h2>
                <p>{produto.descricao}</p>
            </div>
            <div className="preco">
                <div className="icon">
                    <p>Preço</p>
                    <BadgeDollarSign />
                </div>
                <p>{produto.preco}</p>
            </div>

            <div className="preco">
                <div className="icon">
                    <p>Quntidade</p>
                    <Calculator />
                </div>
                <p>{produto.quantidade}</p>
            </div>
            <div className="botao">
                <Link onClick={editarProduto}><Pencil /></Link>
                <Link onClick={removeProduto}><Trash2 /></Link>
            </div>
            
        </div>
    )
}

function TelaSalvaProduto({abrirFormulario, setAbrirFormulario, setProdutosFiltro}) {
    
    
    const [formularioDados, setFormularioDados] = useState(estadoInicialDoFormulario)
    const dispatch = useDispatch()
    const [imagem, setImagem] = useState(null)

    console.log(formularioDados);

    useEffect(() => {
        if (produtoTemp)
            setFormularioDados(produtoTemp)
    }, [produtoTemp])
    
    
    const formularioControl = contraladorDoFormularioAdminProduto;

    const {nome, preco, quantidade, categoria} = formularioDados
    
    function onSubmit(event) {
        event.preventDefault()

        if (verificaInput(nome) || verificaInput2(preco) || verificaInput2(quantidade) || categoria === 'categoria') return toastInformacao('Campos obrigatorios')
        
        dispatch(salvaProduto({formularioDados, imagem})).then(data => {

            if(data.payload?.estado) {
                toastSucesso('Produto registrado com sucesso')
                dispatch(buscaTodosProdutos(null)).then(data => setProdutosFiltro(data.payload))
                setAbrirFormulario(false)
                setImagem(null)
                setFormularioDados(estadoInicialDoFormulario)
                produtoTemp = undefined
            } else if (data.payload?.status === 400) {
                toastErro(data.payload?.titulo|| data.payload?.detail || data.payload?.message)
            } else {
                console.log(data);
                toastErro('Erro ao registar o produto')
            }
        })
    }

    useEffect(() => {
        dispatch(buscaTodasCategorias()).then(data=>formularioControl[2].opcao = [{id: 'categoria', nome: 'Seleciona'}, ...data.payload])
        dispatch(buscaTodasMarcas()).then(data=>formularioControl[3].opcao = [{id: 'marca', nome: 'Seleciona'}, ...data.payload])
    }, [])

    return (
        <div>
            {
                abrirFormulario && <div  className="salvar-produto" >
                    <h1>Novo Produto</h1>
                    <CarregarImage imagem={imagem} setImagem={setImagem}/>
                    <Formulario 
                        formularioControl={formularioControl}
                        formularioDados={formularioDados}
                        setFormularioDados={setFormularioDados}
                        textoDoBotao={'Adicionar'}
                        onSubmit={onSubmit}
                    />
                </div>
            }
        </div>
    )
}

function AdminProduto() {
    const {produtos} = useSelector(state => state.produtos)
    const {texto} = useSelector(state => state.util)
    const dispatch = useDispatch()
    const [produtosFiltro, setProdutosFiltro] = useState([])
    const [abrirFormulario, setAbrirFormulario] = useState(false)

    function adicionarNovoProduto() {
        setAbrirFormulario(!abrirFormulario)
    }

    function fecharFormulario() {
        if (abrirFormulario) setAbrirFormulario(false)
    }

    useEffect(() => {
        dispatch(buscaTodosProdutos(null)).then(data => setProdutosFiltro(data.payload))
    }, [dispatch])

    return (
        <>
            <div className="pagina-admin-produto-btn">
                <Botao onClick={adicionarNovoProduto}><ShoppingBasket /> Adicionar novo produto</Botao>
                <TelaSalvaProduto abrirFormulario={abrirFormulario} setAbrirFormulario={setAbrirFormulario} setProdutosFiltro={setProdutosFiltro}/>
            </div>
            <div className="pagina-admin-produto-lista" onClick={fecharFormulario}>
                {
                    localizacao() === CONSTANTES.MENU_TITULO_PRODUTOS && produtosFiltro.filter(({nome}) =>
                        nome?.toLowerCase()?.includes(texto.toLowerCase())).map(produto => <ProdutoCard key={produto.id} produto={produto} setAbrirFormulario={setAbrirFormulario} setProdutosFiltro={setProdutosFiltro}/>)
                }
            </div>
        </>
    )
}

export default AdminProduto