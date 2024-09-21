import ReactDom from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import App from './App'
import store from './redux/store'

import 'react-toastify/dist/ReactToastify.css'

const root = ReactDom.createRoot(document.getElementById('root'))
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
            <ToastContainer />
        </Provider>
    </BrowserRouter>
)