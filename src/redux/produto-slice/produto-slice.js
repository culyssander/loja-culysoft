import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import { API_URL } from "../../config/api-url";

const initialState = {
    estaCarregado: true,
    produtos: []
}

export const buscaTodosProdutos = createAsyncThunk('/produtos/todos', async(props) => {
    try {
        let filtro = ''

        if (props)  {
            const {pagina, limite, sortAtributo, sortAscendente} = props
            filtro = `pagina=${pagina}&limite=${limite}&sortAtributo=${sortAtributo}&sortAscendente=${sortAscendente}`
        }
        const response = await fetch(`${API_URL}/produtos?${filtro}`)
        return await response.json()

    } catch (error) {
        return error
    }
})

export const salvaProduto = createAsyncThunk('/produtos/salva', async(props) => {
    try {
        const {imagem, formularioDado} = props
        const cookies = new Cookies()

    if (formularioDado?.id) {
            delete formData.datacriacao
            delete formData.usuario
            delete formData.ultimaAlteracao

            if (imagem) 
                formularioDado.imagemUrl = ''
    }

    let formDataInput = new FormData()

    formDataInput.append('file', imagem)
    formDataInput.append('input', JSON.stringify(formularioDado))

    const response = await fetch(`${API_URL}/produtos`,{
        method: 'POST',
        headers: {
            Authorization: `Bearer ${cookies.get('TOKEN')}`
        },
        body: formDataInput
    })

    return await response.json()
    } catch (error) {
        return error
    }
})

const produtoSlice = createSlice({
    name: 'produtos',
    initialState,
    reducers: {},
    extraReducers: (build) => {
        build.addCase(buscaTodosProdutos.pending, (state) => {
            state.estaCarregado = true,
            state.produtos = []
        }).addCase(buscaTodosProdutos.fulfilled, (state, action) => {
            state.estaCarregado = false
            state.produtos = action.payload
        }).addCase(buscaTodosProdutos.rejected, (state, action) => {
            state.estaCarregado = false
            state.produtos = []
        })

        build.addCase(salvaProduto.pending, (state) => {

        }).addCase(salvaProduto.fulfilled, (state, action) => {
            console.log(action);
            
        }).addCase(salvaProduto.rejected, (state, action) => {
            console.log(action)
        })
    }
})

export default produtoSlice.reducer