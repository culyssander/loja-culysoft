import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AdminLayout from './components/admin/admin-layout';
import AuthLayout from './components/auth/auth-layout';
import CarregarPagina from './components/common/carregar-pagina';
import ValidaAutorizacao from './components/common/valida-autorizacao';
import ShoppingLayout from './components/shopping/shopping-layout';
import AdminDashboard from './pages/admin/admin-dashboad';
import AdminPermissao from './pages/admin/admin-pemissao';
import AdminPerfil from './pages/admin/admin-perfil';
import AdminProduto from './pages/admin/admin-produto';
import AdminUsuario from './pages/admin/admin-usuario';
import AdminVenda from './pages/admin/admin-venda';
import Login from './pages/auth/login';
import Registro from './pages/auth/registro';
import PaginaNaoEncontrada from './pages/not-found/nao-encontrado';
import NaoAutorizado from './pages/sem-autenticacao/sem-autenticacao';
import ShoppingCheckout from './pages/shopping/shopping-checkout';
import ShoppingCompra from './pages/shopping/shopping-compras';
import ShoppingHome from './pages/shopping/shopping-home';
import ShoppingListagem from './pages/shopping/shopping-listagem';
import ShoppingPerfil from './pages/shopping/shopping-perfil';
import { validaAutenticacao } from './redux/auth-slice/auth-slice';

function App() {

    const {estaLogado, usuario, estaCarregado} = useSelector(state => state.auth)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(validaAutenticacao())
    }, [dispatch])

    if (estaCarregado) {
        return <CarregarPagina/>
    }

    return (
        <div className='container'>
            <Routes>
                <Route path='auth' element={<ValidaAutorizacao estaLogado={estaLogado} usuario={usuario}>
                    <AuthLayout/>
                </ValidaAutorizacao>}>
                    <Route path='login' element={<Login/>} />
                    <Route path='registro' element={<Registro/>} />
                </Route>

                <Route path='admin' element={<ValidaAutorizacao estaLogado={estaLogado} usuario={usuario}>
                    <AdminLayout/>
                </ValidaAutorizacao>}>
                    <Route path='dashboard' element={<AdminDashboard/>}/>
                    <Route path='produtos' element={<AdminProduto/>}/>
                    <Route path='vendas' element={<AdminVenda/>}/>
                    <Route path='usuarios' element={<AdminUsuario/>}/>
                    <Route path='permissoes' element={<AdminPermissao/>}/>
                    <Route path='perfil' element={<AdminPerfil/>}/>
                </Route>

                <Route path='shop' element={<ValidaAutorizacao estaLogado={estaLogado} usuario={usuario}>
                    <ShoppingLayout/>
                </ValidaAutorizacao>}>
                    <Route path='perfil' element={<ShoppingPerfil/>}/>
                    <Route path='checkout' element={<ShoppingCheckout/>}/>
                    <Route path='compras' element={<ShoppingCompra/>}/>
                </Route>

                <Route path='/' element={<ShoppingHome/>}/>
                <Route path='/listagem' element={<ShoppingListagem/>}/>
                <Route path='*' element={<PaginaNaoEncontrada/>}/>
                <Route path='/nao-autorizado' element={<NaoAutorizado/>}/>
            </Routes>
        </div>
    )
}

export default App;