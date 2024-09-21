import { configureStore } from "@reduxjs/toolkit";
import authReducers from './auth-slice/auth-slice';
import categoriaReducer from './categoria-slice/categoria-slice';
import utilSlice from './menu-slide/util-slice';
import produtoSlice from "./produto-slice/produto-slice";

const store = configureStore({
    reducer: {
        auth: authReducers,
        produtos: produtoSlice,
        util: utilSlice,
        categorias: categoriaReducer
    }
})

export default store