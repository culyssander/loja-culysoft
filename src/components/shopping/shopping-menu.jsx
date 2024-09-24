import { useDispatch, useSelector } from 'react-redux';
import { Link, useSearchParams } from "react-router-dom";
import { shoppingMenuOpcoes } from "../../config/formulario-config";

import { useEffect, useState } from "react";
import logo from '../../img/culysoft-logo.png';

import MenuUsuario from "../common/menu-usuario";

import { ShoppingCart } from "lucide-react";
import ShoppingCarrinho from "./shopping-carrinho";
import './styles/shopping-menu.css';

import desconhecido from '../../img/perfil-conta-desconhecido.jpg';
import { actualizarPagina } from '../../redux/carrinho-slice/carrinho-slice';
import { buscarTodosPeloFiltro } from '../../redux/produto-slice/produto-slice';

function ShoppingMenu({filtro, setFiltro}) {

    const [searchParams, setSearchParams] = useSearchParams()
    const [abrirMenuUsuario, setAbrirMenuUsuario] = useState(false)
    const [abrirCarrinho, setAbrirCarrinho] = useState(false)
    const {estaLogado, usuario} = useSelector(state => state.auth)
    const {produtos} = useSelector(state => state.carrinhos)
    const dispatch = useDispatch()

    function mostrarCarrinho() {
        if (produtos.length > 0)
            setAbrirCarrinho(!abrirCarrinho)
    }

    useEffect(() => {
        if (produtos && produtos.length > 0)
            sessionStorage.setItem('produtos', JSON.stringify(produtos))
    }, [produtos])

    useEffect(() => {
        const produtoStorage = JSON.parse(sessionStorage.getItem('produtos'))
        if (produtoStorage && produtoStorage.length > 0) {
            dispatch(actualizarPagina(produtoStorage))
        }
    }, [])

    function escolhePagina() {
        console.log('CLICOU');
        
        let sortAtributo = 'nome', sortAscendente = 'true'
        let id = 1
        let valor = searchParams.get('categoria')
        switch(valor) {
            case 'calcado': id = 1; break;
            case 'homem': id = 2; break
            case 'mulher': id = 3 ; break
            case 'crianca': id = 4; break
            case 'acessorio': id =5; break
        }

        const filtro = 	{"Categorias":[id]}
        dispatch(buscarTodosPeloFiltro({filtro, sortAtributo, sortAscendente}))
        dispatch(buscarTodosPeloFiltro({filtro, sortAtributo, sortAscendente}))
    }

    return (
        
        <>
        <div className="shopping-menu" onClick={() => {
            if (abrirMenuUsuario) setAbrirMenuUsuario(false)
        }}>
            <div className="logo">
                <Link to='/'><img src={logo} alt="culysoft-logo" /></Link>
            </div>
            <ul>
                {
                    shoppingMenuOpcoes.map(opcao => <li key={opcao.id}><Link onClick={escolhePagina} to={opcao.link}>
                        <span>{opcao.titulo}</span>
                    </Link></li>)
                }
            </ul>
            <div className="shopping-menu-usuario">
                <div className="carrinho">
                    <p>{produtos.length > 0 ? produtos.length : ''}</p>
                    <ShoppingCart onClick={mostrarCarrinho} />
                </div>
                {
                    estaLogado ? <img src={usuario?.fotoUrl ? usuario?.fotoUrl: desconhecido} width={300} onClick={() => {setAbrirMenuUsuario(!abrirMenuUsuario)}}/> : <Link to='/auth/login'>Login</Link>
                }
            </div>
        </div>
                {
                    abrirMenuUsuario && <MenuUsuario abrirMenuUsuario={abrirMenuUsuario} setAbrirMenuUsuario={setAbrirMenuUsuario} perfilLink={estaLogado ? usuario?.perfil === 'CLIENTE' ? '/shop/perfil': '/admin/perfil'  :'/auth/login'} comprasLink='/shop/compras'/>
                }
                {
                    abrirCarrinho && <ShoppingCarrinho estaVisivel={abrirCarrinho} setEstaVisivel={setAbrirCarrinho}/>
                }
        </>
    )
}

export default ShoppingMenu