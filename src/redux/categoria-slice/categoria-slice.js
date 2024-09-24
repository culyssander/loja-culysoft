import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../config/api-url";

const initialState = {
    categorias: []
}

export const buscaTodasCategorias = createAsyncThunk('/categoria', async() => {
    try {
        const response = await fetch(`${API_URL}/categorias`)
        return await response.json()
    } catch (error) {
        return error
    }
})

const categoriaSlide = createSlice({
    name: 'categoria',
    initialState,
    reducers: {},
    extraReducers: (build) => {
        build.addCase(buscaTodasCategorias.pending, (state) => {
            state.estaCarregado = true
        }).addCase(buscaTodasCategorias.fulfilled, (state, action) => {
            console.log('WWWWWWRRRRRRRRRRRWQQQ', action);
            
            state.estaCarregado = false,
            state.marcas = action.payload
        }).addCase(buscaTodasCategorias.rejected, (state) => {
            state.estaCarregado = false,
            state.marcas = []
        })
    }
})

export const buscarCategoriasEMarcas = createAsyncThunk('/categorias/marca/', async() => {
    try {
        const marcaResponse = await fetch(`${API_URL}/marcas`)
        const categoriaResponse = await fetch(`${API_URL}/categorias`)

        const dataMarca = await marcaResponse.json()
        const dataCategoria = await categoriaResponse.json()
        console.log(dataMarca, dataCategoria);
        
        return {
            Categorias: dataCategoria,
            Marcas: dataMarca
        }
    } catch (error) {
        return error
    }
})

// export const { buscaTodasCategorias } = categoriaSlide.actions
export default categoriaSlide.reducer