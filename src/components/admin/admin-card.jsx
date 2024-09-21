import './styles/admin-card.css';

function AdminCard({titulo, valor, icon}) {
    return (
        <div className="card">
            <div>
                <div className="valor">{valor}</div>
                <div className="titulo">{titulo}</div>
            </div>
            <div className="iconBox">
                {icon}
            </div>
        </div>
    )
}

export default AdminCard