import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    produtos: []
}


const carrinhoSlice = createSlice({
    name: 'carrinho',
    initialState,
    reducers: {
        adicionarProdutoNoCarrinho: (state, action) => {
            const produtoJaExiste = state.produtos.some(produto => produto.id == action.payload.id)

            if (produtoJaExiste) {
                state.produtos = state.produtos.map(produto => produto.id === action.payload.id ? {...produto, quantidade: produto.quantidade + 1} : produto)
                return
            }

            state.produtos = [...state.produtos, {...action.payload, quantidade: 1}]
        },

        aumentarQuantidadeDoProdutoNoCarrinho: (state, action) => {
            state.produtos = state.produtos.map(produto => produto.id === action.payload.id ? {...produto, quantidade: produto.quantidade + 1} : produto)
        },
        diminuirQuantidadeDoProdutoNoCarrinho: (state, action) => {
            state.produtos = state.produtos.map(produto => produto.id === action.payload.id ? {...produto, quantidade: produto.quantidade - 1} : produto)
            .filter(produto => produto.quantidade > 0)
        },
        removerProdutoDoCarrinho: (state, action) => {
            state.produtos = state.produtos.filter(produto => produto.id !== action.payload)
        },

        actualizarPagina: (state, action) => {
            if (action.payload && action.payload.length > 0) {
                state.produtos = action.payload
            } else {
                state.produtos = []
            }
        }
    }
})

export const { adicionarProdutoNoCarrinho, aumentarQuantidadeDoProdutoNoCarrinho, diminuirQuantidadeDoProdutoNoCarrinho, removerProdutoDoCarrinho, actualizarPagina  } = carrinhoSlice.actions
export default carrinhoSlice.reducer