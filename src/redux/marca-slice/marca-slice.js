import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../config/api-url";

const initialState = {
    estaCarregado: true,
    marcas: []
}

export const buscaTodasMarcas = createAsyncThunk('/marcas', async() => {
    try {
        const response = await fetch(`${API_URL}/marcas`)
        return await response.json()
    } catch (error) {
        return error
    }
})

const marcaSlide = createSlice({
    name: 'marca',
    initialState,
    reducers: { },
    extraReducers: (build) => {
        build.addCase(buscaTodasMarcas.pending, (state) => {
            state.estaCarregado = true
        }).addCase(buscaTodasMarcas.fulfilled, (state, action) => {
            state.estaCarregado = false,
            state.marcas = action.payload
        }).addCase(buscaTodasMarcas.rejected, (state) => {
            state.estaCarregado = false,
            state.marcas = []
        })
    }
})

export default marcaSlide.reducer