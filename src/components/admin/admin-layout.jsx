import { Outlet } from "react-router-dom"

import { useState } from "react"
import AdminHeader from "./admin-header"
import AdminMenu from "./admin-menu"
import './styles/admin-layout.css'

function AdminLayout() {

    const [toggleActivo, setToggleActivo] = useState(false)
    const [textPesquisado, setTextoPesquisado] = useState('')

    return (
        <div className="admin-layout">
            <AdminMenu toggleActivo={toggleActivo}/>
            <div className={`top ${toggleActivo ? 'activo' : ''}`}>
                <AdminHeader toggleActivo={toggleActivo} setToggleActivo={setToggleActivo}/>
                <main>
                    <Outlet/>
                </main>
            </div>
        </div>
    )
}

export default AdminLayout