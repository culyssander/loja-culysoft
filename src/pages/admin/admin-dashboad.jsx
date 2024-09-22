import { BadgeDollarSign, MessageSquareDot, ShoppingBasket, Users } from 'lucide-react'
import AdminCard from '../../components/admin/admin-card'

import './styles/admin-dashboard.css'

function AdminDashboard() {

    return (
        <div className='pagina-admin-dashboard'>
            <div className="cardBox">
                <AdminCard titulo='Vendas' valor={`R$ ${5000}`} icon={<BadgeDollarSign size={50} />}/>
                <AdminCard titulo='Produtos'  valor={159} icon={<ShoppingBasket size={50}/>}/>
                <AdminCard titulo='Usuários' valor={10} icon={<Users size={50}/>}/>
                <AdminCard titulo='Notificcações' valor={2500} icon={<MessageSquareDot size={50} />}/>
            </div>
        </div>
    )
}

export default AdminDashboard