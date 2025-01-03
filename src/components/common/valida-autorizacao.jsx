import { Navigate, useLocation } from "react-router-dom";

function ValidaAutorizacao({estaLogado, usuario, children}) {
    const localizacao = useLocation()

    if (!estaLogado && !(localizacao.pathname.includes('/login') || 
                        localizacao.pathname.includes('/registro'))) {
        return <Navigate to='/auth/login'/>
    }

    if (estaLogado && (localizacao.pathname.includes('/login') || 
                    localizacao.pathname.includes('/registro'))) {
                        
        if (usuario?.perfil === 'ADMIN') {
            return <Navigate to='/admin/dashboard' />
        } else {
            return <Navigate to='/' />
        }
    }

    if (estaLogado && usuario?.perfil !== 'ADMIN' && localizacao.pathname.includes('/admin')) {
        return <Navigate to='/nao-autorizado' />
    }

    if (estaLogado && usuario?.perfil === 'ADMIN' && localizacao.pathname.includes('/shop')) {
        return <Navigate to='/admin/dashboard' />
    }

    return <>{children}</>
}

export default ValidaAutorizacao