import { CircleCheckBig } from "lucide-react";
import { Link, Navigate } from "react-router-dom";

import { useEffect, useState } from "react";
import './styles/shopping-obrigado.css';

function ShoppingObrigado() {
    const [vendaId, setVendaId] = useState('')

    console.log('vendaId', vendaId);
    

    useEffect(() => {
        let vendaIdTemp = sessionStorage.getItem('vendaId')
        setVendaId(vendaIdTemp)
    }, [])
    console.log('vendaId', vendaId);

    return (
        <div className="shopping-obrigado">
            {
                true ? <div className="shopping-obrigado-info">
                    <div className="logo">
                        <CircleCheckBig size={100} />
                    </div>
                    <h2>Muito obrigado pela prefêrencia</h2>
                    <p>Os detalhes da corfimação da compra e o link de companhamento da entrega foram enviado para o seu email</p>
                    <span>Referência da compra: #{vendaId}</span>
                    <div className="botoes">
                        <Link to='/shop/compras'>Visualizar a comprar</Link>
                        <Link to='/'>continuar a comprar</Link>
                    </div>
                </div> : <Navigate to={'/'} />
            }
        </div>
    )
}
export default ShoppingObrigado