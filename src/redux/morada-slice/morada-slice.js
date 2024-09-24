import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

const initialState = {
    morada: null
}

const cookies = new Cookies()

export const salvarMoradaPeloUsuarioLogado = createAsyncThunk('/moradas/salvar', async(props) => {
    console.log(props);
    
    try {
        const url = 'http://localhost:8080/api/v1/moradas'
        const response = await fetch(url, {
        method:'POST',
        headers: {
            Authorization: `Bearer ${cookies.get('TOKEN')}`,
            'Content-type': 'application/json'
        },
        body: JSON.stringify(props)
    })

    return await response.json()
    } catch (error) {
        return error
    }
})


export const buscaMoradaPeloUsuarioLogado = createAsyncThunk('/moradas/busca', async() => {
    const url = 'http://localhost:8080/api/v1/moradas/usuario-logado'
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${cookies.get('TOKEN')}`
        }
    })

    return await response.json()
})


const moradaSlice = createSlice({
    name: 'morada',
    initialState,
    reducers: {},
    extraReducers: (build) => {
        build.addCase(buscaMoradaPeloUsuarioLogado.pending, (state) => {
            state.morada = null;
        }).addCase(buscaMoradaPeloUsuarioLogado.fulfilled, (state, action) => {
            state.morada = action.payload
        }).addCase(buscaMoradaPeloUsuarioLogado.rejected, (state) => {
            state.morada = null
        })

        build.addCase(salvarMoradaPeloUsuarioLogado.pending, (state) => {
            state.morada = null;
        }).addCase(salvarMoradaPeloUsuarioLogado.fulfilled, (state, action) => {
            state.morada = action.payload
        }).addCase(salvarMoradaPeloUsuarioLogado.rejected, (state, action) => {
            console.log(action);
            
            state.morada = null
        })
    }
})

export default moradaSlice.reducer