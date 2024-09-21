import { useLocation } from "react-router-dom";

export const verificaInput = (input) => input.trim().length < 1

export const formataData  = (data) => data?.split('-').reverse().join('-')

export const localizacao = () => {
    const localizacao = useLocation()
    return localizacao.pathname.split("/")[2];
}