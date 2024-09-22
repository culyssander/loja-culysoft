import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { shoppingMenuOpcoes } from "../../config/formulario-config";

import { useEffect, useState } from "react";
import logo from '../../img/culysoft-logo.png';

import MenuUsuario from "../common/menu-usuario";

import { ShoppingCart } from "lucide-react";
import ShoppingCarrinho from "./shopping-carrinho";
import './styles/shopping-menu.css';

import desconhecido from '../../img/perfil-conta-desconhecido.jpg';
import { actualizarPagina } from '../../redux/carrinho-slice/carrinho-slice';

function ShoppingMenu() {

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
                    shoppingMenuOpcoes.map(opcao => <li key={opcao.id}><Link to={opcao.link}>
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
                    abrirMenuUsuario && <MenuUsuario abrirMenuUsuario={abrirMenuUsuario}/>
                }
                {
                    abrirCarrinho && <ShoppingCarrinho estaVisivel={abrirCarrinho} setEstaVisivel={setAbrirCarrinho}/>
                }
        </>
    )
}

export default ShoppingMenu