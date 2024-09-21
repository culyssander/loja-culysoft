import { Link } from "react-router-dom"

import { Frown } from "lucide-react"
import './styles/nao-encontrada.css'

function PaginaNaoEncontrado() {
    return (
        <div className="pagina-nao-encontrada">
            <Frown size={200}/>
            <h1>Pagina não encontrada</h1>
            <Link to='/'>Home</Link>
        </div>
    )
}

export default PaginaNaoEncontrado