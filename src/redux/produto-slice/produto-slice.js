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
            const {pagina = 0, limite = 50, sortAtributo, sortAscendente} = props
            filtro = `pagina=${pagina}&limite=${limite}&sortAtributo=${sortAtributo}&sortAsc=${sortAscendente}`
        }
        console.log('filtro', filtro);
        
        const response = await fetch(`${API_URL}/produtos?${filtro}`)
        return await response.json()

    } catch (error) {
        return error
    }
})

export const salvaProduto = createAsyncThunk('/produtos/salva', async(props) => {
    try {
        const {imagem, formularioDados} = props
        const cookies = new Cookies()
        console.log(imagem, formularioDados);
        
        // let obj = {a: 1, b: 2, c: 3, z:26};

    if (formularioDados?.id || formularioDados?.id === '') {
            delete formularioDados.datacriacao
            delete formularioDados.usuario
            delete formularioDados.ultimaAlteracao
            // delete formularioDados.imagemUrl
        if (imagem)  formularioDados.imagemUrl = ''
    }

    console.log(formularioDados);

    let formDataInput = new FormData()

    formDataInput.append('file', imagem)
    formDataInput.append('input', JSON.stringify(formularioDados))

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

export const removerProduto = createAsyncThunk('produtos/remover', async(props) => {
    try {
        const cookies = new Cookies()
        const response = await fetch(`${API_URL}/produtos/ ${props}`,{
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${cookies.get('TOKEN')}`
            },
        })

        return response.json()
    } catch (error) {
        return error
    }
}) 

export const buscarTodosPeloFiltro = createAsyncThunk('/shop/products/', async({filtro, sortAtributo, sortAscendente}) => {
    try {
        let categoriaIds = '';
        let marcaIds = '';

        Object.keys(filtro).map( keys => {
            if (keys === 'Categorias' && filtro[keys].length > 0 ) categoriaIds = filtro[keys].join(',')
            if (keys === 'Marcas' && filtro[keys].length > 0 ) marcaIds = filtro[keys].join(',')
        })

        console.log('CATEGORIAS', categoriaIds);
        
        
        const response = await fetch(`${API_URL}/produtos/filtro?categoriaIds=${categoriaIds}&marcaIds=${marcaIds}&sortAtributo=${sortAtributo}&sortAsc=${sortAscendente}`)

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
            state.estaCarregado = true
        }).addCase(salvaProduto.fulfilled, (state, action) => {
            console.log(action);
            
            state.estaCarregado = false
        }).addCase(salvaProduto.rejected, (state, action) => {
            state.estaCarregado = false
        })

        build.addCase(buscarTodosPeloFiltro.pending, (state) => {
            state.estaCarregado = true
        }).addCase(buscarTodosPeloFiltro.fulfilled, (state, action) => {
            console.log('fulfilled', state, action);
            state.estaCarregado = false
            state.produtos = action.payload
        }).addCase(buscarTodosPeloFiltro.rejected, (state, action) => {
            state.estaCarregado = false;
            state.produtos = []
        })

        // build.addCase(removerProduto.pending, (state) => {
        //     state.estaCarregado = true
        // }).addCase(removerProduto.fulfilled, (state) => {
        //     state.estaCarregado = false
        // }).addCase(removerProduto.rejected, (state) => {
        //     state.estaCarregado = false
        // })
    }
})

export default produtoSlice.reducer