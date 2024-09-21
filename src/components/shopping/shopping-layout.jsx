import { Outlet } from "react-router-dom"
import ShoppingMenu from "./shopping-menu"

function ShoppingLayout() {
    return (
        <div className="shopping-layout">
            <ShoppingMenu/>
            <main>
                <Outlet/>
            </main>
        </div>
    )
}

export default ShoppingLayout