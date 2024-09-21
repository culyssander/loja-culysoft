import { ShieldX } from "lucide-react"
import { Link } from "react-router-dom"

import './styles/sem-autorizacao.css'

function SemAutorizacao() {
    return (
        <div className="sem-autorizacao">
            <ShieldX size={200}/>
            <h1>Sem autorização </h1>
            <Link to='/'>Home</Link>
        </div>
    )
}

export default SemAutorizacao