import { useState } from "react";
import Perfil from "../../components/common/perfil";

function ShoppingPerfil() {

    const usuario ={
        "id": 2,
        "nome": "Quitumba",
        "email": "quitumba@gmail.com",
        "perfil": "ADMIN",
        "estado": true,
        "dataCriacao": "2024-09-09T09:44:41",
        "ultimoLogin": "2024-09-19T22:48:14.3947698"
    }
    const [formularioData, setFormularioDados] = useState(usuario)
    function onSubmit() {

    }

    return (
        <div>
            <Perfil onSubmit={onSubmit} usuario={usuario} formularioData={formularioData} setFormularioDados={setFormularioDados} />
        </div>
    )
}

export default ShoppingPerfil;