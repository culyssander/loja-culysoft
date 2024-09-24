import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import { API_URL } from "../../config/api-url";

const initialState = {
    estaCarregado: true,
    pagamento: null
}

const cookies = new Cookies()

export const salvarPagamento = createAsyncThunk('/pagamentos/salva', async(props) => {
    try {
        const response = fetch(`${API_URL}/pagamentos`, {
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

const pagamentoSlice = createSlice({
    name: 'pagamentos',
    initialState,
    reducers:{},
    extraReducers: (build) => {
        build.addCase(salvarPagamento.pending, (state) => {
            state.estaCarregado = true
        }).addCase(salvarPagamento.fulfilled, (state, action) => {
            console.log(action);
            
            state.estaCarregado = false,
            state.pagamento = action.payload
        }).addCase(salvarPagamento.rejected, (state) => {
            state.estaCarregado = false
            state.pagamento = null
        })
    }

})


export default pagamentoSlice.reducer