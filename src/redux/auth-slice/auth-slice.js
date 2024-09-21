import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import Cookies from "universal-cookie";
import { API_URL } from '../../config/api-url';

const initialState = {
    estaCarregado: true,
    estaLogado: false,
    usuario: null
}

const cookies = new Cookies()

export const loginUsuario = createAsyncThunk('auth/login', async(formularioData) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(formularioData)
        })

        return await response.json()
    } catch (error) {
        return error
    }
})

export const logoutUsuario = createAsyncThunk('auth/logout', async() => {
    cookies.remove('TOKEN')
})

export const validaAutenticacao = createAsyncThunk('auth/valida-autenticacao', async() => {
    try {
        const response = await fetch(`${API_URL}/usuario-logado`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${cookies.get('TOKEN')}`,
                'Content-type': 'application/json',
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                Expires: 0
            }
        })

        return await response.json()
    } catch (error) {
        return error
    }
})

export const registroUsuario = createAsyncThunk('auth/registro', async(formularioData) => {
    try {
        const response = await fetch(`${API_URL}/usuarios/regista-cliente`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(formularioData)
        })

        return response.json()
    } catch (error) {
        return error
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (build) => {
        build.addCase(loginUsuario.pending, (state) => {
            state.estaCarregado = true
        }).addCase(loginUsuario.fulfilled, (state, action) => {
            state.estaCarregado = false,
            state.estaLogado = action.payload.status == 200 ? true : false;
            state.usuario = action.payload.status == 200 ? action.payload.usuario : null
        }).addCase(loginUsuario.rejected, (state) => {
            state.estaCarregado = false
            state.estaLogado = false
            state.usuario = null
        })

        build.addCase(validaAutenticacao.pending, (state) => {
            state.estaCarregado = true
        }).addCase(validaAutenticacao.fulfilled, (state, action) => {
            state.estaCarregado = false
            state.usuario = action.payload?.estado ? action.payload : null
            state.estaLogado = action.payload?.estado ? true : false
        }).addCase(validaAutenticacao.rejected, (state) => {
            state.estaCarregado = false
            state.estaLogado = false
            state.usuario = null
        })

        build.addCase(logoutUsuario.pending, (state) => {
            state.estaCarregado = true
        }).addCase(logoutUsuario.fulfilled, (state) => {
            state.estaCarregado = false
            state.estaLogado = false
            state.usuario = null
        }).addCase(logoutUsuario.rejected, (state) => {
            state.estaCarregado = false
            state.estaLogado = false
            state.usuario = null
        })

        build.addCase(registroUsuario.pending, (state) => {
            state.estaCarregado = true
        }).addCase(registroUsuario.fulfilled, (state) => {
            state.estaCarregado = false
            state.estaLogado = false
            state.usuario = null
        }).addCase(registroUsuario.rejected, (state) => {
            state.estaCarregado = false
            state.estaLogado = false
            state.usuario = null
        })
    }
})


export default authSlice.reducer