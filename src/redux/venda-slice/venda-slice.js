import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import { API_URL } from "../../config/api-url";

const initialState = {
    estaCarregado: true,
    venda: null,
    vendas: []
}

const cookies = new Cookies()

export const salvarVenda = createAsyncThunk('/vendas/salva', async(props) => {
    try {
        const response = fetch(`${API_URL}/vendas`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${cookies.get('TOKEN')}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify(props)
        })

        return (await response).json()
    } catch (error) {
        return error
    }
})

export const buscarTodasVendas = createAsyncThunk('/vendas/todos', async() => {
    try {
        const response = fetch(`${API_URL}/vendas`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${cookies.get('TOKEN')}`,
                'Content-type': 'application/json'
            }
        })

        return (await response).json()
    } catch (error) {
        return error
    }
})

export const buscarVendaUsuarioLogado = createAsyncThunk('/vendas/usuario-logado', async() => {
    try {
        const response = fetch(`${API_URL}/vendas/usuario-logado`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${cookies.get('TOKEN')}`,
                'Content-type': 'application/json'
            }
        })

        return (await response).json()
    } catch (error) {
        return error
    }
})

const vendaSlice = createSlice({
    name: 'vendas',
    initialState,
    reducers:{},
    extraReducers: (build) => {
        build.addCase(salvarVenda.pending, (state) => {
            state.estaCarregado = true
        }).addCase(salvarVenda.fulfilled, (state, action) => {
            console.log('EEEEEEEEEE',action);
            state.estaCarregado = false,
            state.venda = action.payload
            console.log('EEEEEEEEEE',state.venda);
        }).addCase(salvarVenda.rejected, (state) => {
            state.estaCarregado = false
            state.venda = null
        })

        build.addCase(buscarVendaUsuarioLogado.pending, (state) => {
            state.estaCarregado = true
        }).addCase(buscarVendaUsuarioLogado.fulfilled, (state, action) => {
            state.estaCarregado = false
            state.vendas = action.payload
        }).addCase(buscarVendaUsuarioLogado.rejected, (state) => {
            state.estaCarregado = false
            state.vendas = []
        })
    }

})


export default vendaSlice.reducer