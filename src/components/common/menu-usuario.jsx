import { LogOut, ShoppingBag, UserRoundPen } from "lucide-react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { logoutUsuario } from "../../redux/auth-slice/auth-slice";
import './styles/menu-usuario.css';

function MenuUsuario({abrirMenuUsuario, setAbrirMenuUsuario, perfilLink, comprasLink}) {

    const { usuario} = useSelector(state => state.auth)
    const dispatch = useDispatch()

    function logoutDoUsuario() {
        dispatch(logoutUsuario())
    }

    return (
        <div>
            {
                abrirMenuUsuario && <div className={`menu-usuario ${usuario?.perfil === 'ADMIN'? 'admin': '' }`}>
                <ul onClick={() => { if (abrirMenuUsuario) setAbrirMenuUsuario(!abrirMenuUsuario)}}>
                    <li>
                        <Link to={perfilLink}>
                            <span className="icon"><UserRoundPen /></span>
                            <span className="texto">Perfil</span>
                        </Link>
                    </li>

                    {
                        usuario?.perfil !== 'ADMIN' && 
                        <li>
                        <Link to={comprasLink}>
                            <span className="icon"><ShoppingBag /></span>
                            <span className="texto">Compras</span>
                        </Link>
                        </li>
                    }
    
                    <li>
                        <Link onClick={logoutDoUsuario}>
                            <span className="icon"><LogOut /></span>
                            <span className="texto">Sair</span>
                        </Link>
                    </li>
                </ul>
            </div>
            }
        </div>
    )
}

export default MenuUsuario