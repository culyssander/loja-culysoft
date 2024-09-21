import { useState } from "react"
import { Link } from "react-router-dom"
import Formulario from "../../components/common/formulario"
import { controlLoginFormulario } from "../../config/formulario-config"

import { useDispatch } from "react-redux"
import Cookies from "universal-cookie"
import { loginUsuario } from "../../redux/auth-slice/auth-slice"
import { toastErro, toastInformacao, toastSucesso } from "../../utils/toasters"
import { verificaInput } from "../../utils/verificacao"
import './styles/login.css'
const estadoInicial = {
    email: '',
    senha: ''
}

function Login () {

    const [formularioData, setFormularioData] = useState(estadoInicial)
    const dispatch = useDispatch()
    const cookies = new Cookies

    const {email, senha} = formularioData

    function onSubimt(event) {
        event.preventDefault()

        if (verificaInput(email) || verificaInput(senha)) return toastInformacao('Campos obrigatórios')
        
        const expires = new Date()
        expires.setDate(expires.getDate()+1)

        dispatch(loginUsuario(formularioData)).then(data => {
            if (data.payload?.status === 200) {
                const TOKEN = data.payload.token
                cookies.set('TOKEN', TOKEN, {expires})
                toastSucesso(data.payload.mensagem)
            } else {
                toastErro(data.payload.titulo)
            }
        })
    }

    return (
        <div className="login">
            <div className="login-capa">
            </div>
            <div className="login-form">
            <div className="login-form-info">
                <h2>Entrar</h2>
                <p>Aproveita os nossos produtos em promoção</p>
            </div>
            <Formulario 
                formularioControl={controlLoginFormulario}
                formularioDados={formularioData}
                setFormularioDados={setFormularioData}
                onSubmit={onSubimt}
                textoDoBotao='Entrar'
            />
            <div className="login-rodape">
                <p>Não tem uma conta? <Link to='/auth/registro'> Cadastre-se</Link></p>
            </div>
            </div>
        </div>
    )
}

export default Login