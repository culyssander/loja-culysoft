import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Formulario from "../../components/common/formulario"
import { controlRegistroFormulario } from "../../config/formulario-config"

import { useDispatch } from "react-redux"
import { registroUsuario } from "../../redux/auth-slice/auth-slice"
import { toastErro, toastInformacao, toastSucesso } from "../../utils/toasters"
import { verificaInput } from "../../utils/verificacao"
import './styles/registro.css'

const estadoInicial = {
    nome: '',
    email: '',
    senha: ''
}

function Registro () {

    const [formularioData, setFormularioData] = useState(estadoInicial)
    const dispatch = useDispatch()
    const navegate = useNavigate()

    const {nome, email, senha} = formularioData

    function onSubimt(event) {
        event.preventDefault()

        if (verificaInput(nome) || verificaInput(email) || verificaInput(senha)) return toastInformacao('Campos Obrigatórios')
        
        dispatch(registroUsuario(formularioData)).then(data => {
            if (data?.payload?.perfil === 'CLIENTE') {
                toastSucesso('Usuario criado com sucesso')
                navegate('/auth/login')
            } else if (data?.payload?.status === 400) {
                toastErro(data?.payload?.titulo)
            } else {
                toastErro('Error ao criar usuario')
            }
        })
    }

    return (
        <div className="registro">
            <div className="registro-capa">
            </div>
            <div className="registro-form">
            <div className="registro-form-info">
                <h2>Cadastre-se na loja Culysoft</h2>
                <p>Já tem uma conta? <Link to='/auth/login'> Entrar</Link></p>
            </div>
            <Formulario 
                formularioControl={controlRegistroFormulario}
                formularioDados={formularioData}
                setFormularioDados={setFormularioData}
                onSubmit={onSubimt}
                textoDoBotao='Cadastrar-se'
            />
            <div className="registro-rodape">
                <p>Ao se cadastrar, você concorda com os <Link>Termos e a Política de privacidade.</Link></p>
            </div>
            </div>
        </div>
    )
}

export default Registro