import { Logs, Search } from "lucide-react";
import usuarioImagem from '../../img/perfil-conta-desconhecido.jpg';
import MenuUsuario from '../common/menu-usuario';

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { textoPesquisando } from "../../redux/menu-slide/util-slice";
import './styles/admin-header.css';

function AdminHeader({toggleActivo, setToggleActivo}) {

    const [abrirMenuUsuario, setAbrirMenuUsuario] = useState(false)
    const {usuario} = useSelector(state => state.auth)
    const dispatch = useDispatch()

    function clicouNoMenuToggle() {
        setToggleActivo(!toggleActivo)
    }

    function clicouEmAbrirMenuUsuario() {
        setAbrirMenuUsuario(!abrirMenuUsuario)
    }

    function pesquisar(event) {
        dispatch(textoPesquisando(event.target.value))
    }

    return (
        <header className="admin-header" onClick={() => {
            if (abrirMenuUsuario) setAbrirMenuUsuario(false)
        }}>
            <div className="toggle" onClick={clicouNoMenuToggle}><Logs size={30} /></div>

            <div className="pesquisar">
                <label id="pesquisar">
                    <input type="text" placeholder="Pesquisa por aqui..." id="pesquisar" onKeyDown={pesquisar} />
                    <Search className="icon" />
                </label>
            </div>

            <div className="usuario" onClick={clicouEmAbrirMenuUsuario}>
                <img src={usuario?.fotoUrl ? usuario?.fotoUrl:usuarioImagem} alt="" />
                {
                    abrirMenuUsuario && <MenuUsuario abrirMenuUsuario={abrirMenuUsuario} perfilLink='/admin/perfil' />
                }
            </div>
        </header>
    )
}

export default AdminHeader