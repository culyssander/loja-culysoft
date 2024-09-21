import { BadgeDollarSign, Calculator, Pencil, ShoppingBasket, Trash2 } from "lucide-react"

import { Link } from "react-router-dom"
import Botao from '../../components/ui/Botao'
import './styles/admin-produto.css'

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Formulario from "../../components/common/formulario"
import CarregarImagem from "../../components/ui/CarregarImagem"
import { CONSTANTES } from "../../config/constantes"
import { contraladorDoFormularioAdminProduto } from "../../config/formulario-config"
import imagemIndisponivel from '../../img/indisponivel.jpg'
import { buscaTodasCategorias } from "../../redux/categoria-slice/categoria-slice"
import { buscaTodasMarcas } from "../../redux/marca-slice/marca-slice"
import { buscaTodosProdutos, salvaProduto } from "../../redux/produto-slice/produto-slice"
import { toastInformacao } from "../../utils/toasters"
import { localizacao, verificaInput } from "../../utils/verificacao"

function ProdutoCard({produto}) {
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
                <Link><Pencil /></Link>
                <Link><Trash2 /></Link>
            </div>
            
        </div>
    )
}

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
    datacriacao: ''
}

function TelaSalvaProduto({abrirFormulario, setAbrirFormulario}) {

    const [formularioDados, setFormularioDados] = useState(estadoInicialDoFormulario)
    const dispatch = useDispatch()
    const [categorias, setCategorias] = useState([])
    const [marca, setMarca] = useState([])
    const [imagem, setImagem] = useState(null)

    console.log(formularioDados);
    console.log(imagem);

    const {nome, preco, quantidade, categoria} = formularioDados
    
    function onSubmit(event) {
        event.preventDefault()

        if (verificaInput(nome) || verificaInput(preco) || verificaInput(quantidade) || categoria === 'categoria') return toastInformacao('Campos obrigatorios')
        
        dispatch(salvaProduto({formularioDados, imagem})).then(data => {
            console.log(data);
            
        })
    }

    useEffect(() => {
        dispatch(buscaTodasCategorias()).then(data=>setCategorias(data.payload))
        dispatch(buscaTodasMarcas()).then(data=>setMarca(data.payload))

        contraladorDoFormularioAdminProduto[2].opcao = [{id: 'categoria', nome: 'Seleciona'}, ...categorias]
        contraladorDoFormularioAdminProduto[3].opcao = [{id: 'marca', nome: 'Seleciona'}, ...marca]
    }, [dispatch])

    return (
        <div>
            {
                abrirFormulario && <div  className="salvar-produto" >
                    <h1>Novo Produto</h1>
                    <CarregarImagem imagem={imagem} setImagem={setImagem}/>
                    <Formulario 
                        formularioControl={contraladorDoFormularioAdminProduto}
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
    
    const [abrirFormulario, setAbrirFormulario] = useState(false)

    function adicionarNovoProduto() {
        setAbrirFormulario(!abrirFormulario)
    }

    useEffect(() => {
        dispatch(buscaTodosProdutos(null))
    }, [dispatch])

    return (
        <>
            <div className="pagina-admin-produto-btn">
                <Botao onClick={adicionarNovoProduto}><ShoppingBasket /> Adicionar novo produto</Botao>
                <TelaSalvaProduto abrirFormulario={abrirFormulario} setAbrirFormulario={setAbrirFormulario}/>
            </div>
            <div className="pagina-admin-produto-lista">
                {
                    localizacao() === CONSTANTES.MENU_TITULO_PRODUTOS && produtos.filter(({nome}) =>
                        nome?.toLowerCase()?.includes(texto.toLowerCase())).map(produto => <ProdutoCard key={produto.id} produto={produto}/>)
                }
            </div>
        </>
    )
}

export default AdminProduto