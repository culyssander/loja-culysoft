import { configureStore } from "@reduxjs/toolkit";
import authReducers from './auth-slice/auth-slice';
import carrinhoSlice from './carrinho-slice/carrinho-slice';
import categoriaReducer from './categoria-slice/categoria-slice';
import utilSlice from './menu-slide/util-slice';
import moradaSlice from './morada-slice/morada-slice';
import pagamantoSlice from './pagamento-slice/pagamento-slice';
import produtoSlice from "./produto-slice/produto-slice";
import vendaSlice from "./venda-slice/venda-slice";

const store = configureStore({
    reducer: {
        auth: authReducers,
        produtos: produtoSlice,
        util: utilSlice,
        categorias: categoriaReducer,
        carrinhos: carrinhoSlice,
        moradas: moradaSlice,
        pagamentos: pagamantoSlice,
        vendas: vendaSlice
    }
})

export default store