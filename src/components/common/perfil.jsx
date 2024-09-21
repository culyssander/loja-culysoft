import { editarPerfilDoUsuario } from '../../config/formulario-config'
import desconhecido from '../../img/perfil-conta-desconhecido.jpg'
import Formulario from './formulario'

import './styles/perfil.css'

function Perfil({usuario, onSubmit, carregarImagem, formularioData, setFormularioDados}) {

    return(
        <div className="perfil-customizado">
            <div className="perfil-card">
                <h2>{usuario?.nome}</h2>
                <img  src={usuario?.imagemUrl ? usuario?.imagemUrl : desconhecido} alt={usuario?.nome} />
                <label htmlFor="foto">Actualiza a tua foto</label>
                <input type="file" id='foto' name='foto' hidden onClick={carregarImagem}/>
            </div>
            <div className="perfil-editar">
                <h1>Editar o perfil</h1>
                <Formulario
                    formularioControl={editarPerfilDoUsuario}
                    formularioDados={formularioData}
                    setFormularioDados={setFormularioDados}
                    onSubmit={onSubmit}
                    textoDoBotao='Actualizar'
                />
            </div>
        </div>
    )
}

export default Perfil