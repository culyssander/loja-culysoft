import { useDispatch, useSelector } from 'react-redux'
import { editarPerfilDoUsuario } from '../../config/formulario-config'
import desconhecido from '../../img/perfil-conta-desconhecido.jpg'
import Formulario from './formulario'

import { useState } from 'react'
import { actualizarUsuario, alterarFotoDoPerfil, validaAutenticacao } from '../../redux/auth-slice/auth-slice'
import { toastErro, toastInformacao, toastSucesso } from '../../utils/toasters'
import { verificaInput } from '../../utils/verificacao'
import './styles/perfil.css'

function Perfil() {

    const { usuario } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    
    const [formularioDados, setFormularioDados] = useState({...usuario, senha: '', confirmaSenha: ''})

    const {nome, senha, email, confirmaSenha} = formularioDados

    function carregarImagem(event) {
        event.preventDefault()
        const file = event.target.files?.[0];

        dispatch(alterarFotoDoPerfil(file)).then(data => {
            if (data?.payload?.estado) {
                toastSucesso('Foto actualizado sucesso')
                dispatch(validaAutenticacao())
            } else if (data?.payload?.status === 400) {
                toastErro(data?.payload?.titulo)
                dispatch(validaAutenticacao())
            } else {
                toastErro('Error ao actualizar foto')
                dispatch(validaAutenticacao())
            }
        })
    }

    function onSubmit(event) {
        event.preventDefault()
        if (verificaInput(nome)) return toastInformacao('Nome é obrigatorio')

            console.log(!verificaInput(senha) );
            
        
        if (!verificaInput(senha) || !verificaInput(confirmaSenha)) validaSenhaIguais()

        const usuarioActualizado = {nome, email, senha}
        dispatch(actualizarUsuario(usuarioActualizado)).then(data => {
            if (data?.payload?.estado) {
                toastSucesso('Perfil actualizado com sucesso')
            } else if (data?.payload?.status === 400) {
                toastErro(data?.payload?.titulo)
                dispatch(validaAutenticacao())
            } else {
                toastErro('Error ao actualizar')
                dispatch(validaAutenticacao())
            }
        })
    }

    function validaSenhaIguais() {
        if (senha !== confirmaSenha) return toastInformacao('As senhas não são iguais')
    }

    return(
        <div className="perfil-customizado">
            <div className="perfil-card">
                <h2>{usuario?.nome}</h2>
                <img  src={usuario?.fotoUrl ? usuario?.fotoUrl : desconhecido} alt={usuario?.nome} />
                <label htmlFor="foto">Actualiza a tua foto</label>
                <input type="file" id='foto' name='foto' hidden onChange={carregarImagem}/>
            </div>
            <div className="perfil-editar">
                <h1>Editar o perfil</h1>
                <Formulario
                    formularioControl={editarPerfilDoUsuario}
                    formularioDados={formularioDados}
                    setFormularioDados={setFormularioDados}
                    onSubmit={onSubmit}
                    textoDoBotao='Actualizar'
                />
            </div>
        </div>
    )
}

export default Perfil