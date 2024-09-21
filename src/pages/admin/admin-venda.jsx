// import { Pencil, Trash2 } from "lucide-react"
import Tabela from "../../components/ui/Tabela"
import { cabecalhoDaTabelaVenda } from '../../config/formulario-config'

// import { Link } from "react-router-dom"
import './styles/admin-venda.css'

function AdminVenda() {

    const produto = {
        "id": 15,
        "nome": "Tênis Grand Court Alpha",
        "descricao": "Tênis Grand Court Alpha",
        "preco": 400,
        "quantidade": 100,
        "estado": true,
        "datacriacao": "2024-09-14T20:14:35",
        "ultimaAlteracao": "2024-09-14T20:14:35",
        "imagemUrl": "https://storage.googleapis.com/condominio-foto/aad1bbcb-45bd-4490-8cb5-e674ad4a12d4.avif",
        "marca": "Adidas",
        "categoria": "Calçado",
        "usuario": "Quitumba Culissander Cordeiro Ferreira"
    }

    const arr = [produto, produto, {...produto, estado: false}]

    return (
        <div className="admin-vendas">
            <div className="cabelhaco">
                <h2>Vendas</h2>
            </div>
            <Tabela colunas={cabecalhoDaTabelaVenda} dados={arr}/>
        </div>
    )
}

export default AdminVenda