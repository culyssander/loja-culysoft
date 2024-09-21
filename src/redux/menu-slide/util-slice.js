import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    texto: ''
}

const utilSlice = createSlice({
    name: 'util',
    initialState,
    reducers: {
        textoPesquisando: (state, action) => {
            state.texto = action.payload
        }
    }
})

export const {textoPesquisando} = utilSlice.actions
export default utilSlice.reducer