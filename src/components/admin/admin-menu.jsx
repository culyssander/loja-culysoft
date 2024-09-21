import { BadgeDollarSign, Cog, LayoutDashboard, LogOut, ScanFace, ShoppingBasket, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import culysoftLogo from '../../img/culysoft-logo.png';

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { CONSTANTES } from "../../config/constantes";
import { logoutUsuario } from "../../redux/auth-slice/auth-slice";
import './styles/admin-menu.css';

function AdminMenu({toggleActivo}) {
    const localizacao = useLocation()
    const dispatch = useDispatch()
    const [menuSelecionado, setMenuSelecionado] = useState('dashboard')

    function logoutDoUsuario() {
        dispatch(logoutUsuario())
    }

    function activaLink(event) {
        if (toggleActivo) {
            setMenuSelecionado(event?.target?.parentElement?.children[1]?.innerText?.toLowerCase())
        } else {
            setMenuSelecionado(event?.target?.innerText?.toLowerCase())
        }
    }

    useEffect(() => {
        setMenuSelecionado(actualizaLocalizacao())
    }, [dispatch])

    const actualizaLocalizacao = () => {
        return localizacao.pathname.split("/")[2];
    }

    return (
        <nav className={`admin-menu ${toggleActivo ? 'activo' : ''}`}>
            <ul>
                <li>
                    <Link className={`${toggleActivo ? 'activo' : ''}`}>
                        <span className="icon"><img className={`${toggleActivo ? 'activo' : ''}`} src={culysoftLogo} alt="Culysoft logo" /></span>
                    </Link>
                </li>

                <li onClick={activaLink}  className={`${menuSelecionado === CONSTANTES.MENU_TITULO_DASHBOARD ? menuSelecionado: ''}`}>
                    <Link to='/admin/dashboard'>
                        <span className="icon"><LayoutDashboard /></span>
                        <span className="texto">Dashboard</span>
                    </Link>
                </li>

                <li onClick={activaLink} className={`${menuSelecionado === CONSTANTES.MENU_TITULO_PRODUTOS ? menuSelecionado: ''}`}>
                    <Link to='/admin/produtos'>
                        <span className="icon"><ShoppingBasket /></span>
                        <span className="texto">Produtos</span>
                    </Link>
                </li>

                <li onClick={activaLink} className={`${menuSelecionado === CONSTANTES.MENU_TITULO_VENDAS ? menuSelecionado: ''}`}>
                    <Link to='/admin/vendas'>
                        <span className="icon"><BadgeDollarSign /></span>
                        <span className="texto">Vendas</span>
                    </Link>
                </li>

                <li onClick={activaLink} className={`${menuSelecionado === CONSTANTES.MENU_TITULO_USUARIOS ? menuSelecionado: ''}`}>
                    <Link to='/admin/usuarios'>
                        <span className="icon"><Users /></span>
                        <span className="texto">Usuarios</span>
                    </Link>
                </li>

                <li onClick={activaLink} className={`${menuSelecionado === CONSTANTES.MENU_TITULO_PERFIL ? menuSelecionado: ''}`}>
                    <Link to='/admin/perfil'>
                        <span className="icon"><ScanFace /></span>
                        <span className="texto">Perfil</span>
                    </Link>
                </li>

                <li onClick={activaLink} className={`${menuSelecionado === CONSTANTES.MENU_TITULO_CONFIGURACAO? menuSelecionado: ''}`}>
                    <Link>
                        <span className="icon"><Cog /></span>
                        <span className="texto">Configuração</span>
                    </Link>
                </li>

                <li onClick={() => {
                    activaLink()
                    logoutDoUsuario()
                }} className={`${menuSelecionado === CONSTANTES.MENU_TITULO_SAIR ? menuSelecionado: ''}`}>
                    <Link>
                        <span className="icon"><LogOut /></span>
                        <span className="texto">Sair</span>
                    </Link>
                </li >
            </ul>
        </nav>
    )
}

export default AdminMenu