import { useEffect, useState } from "react";
import ShoppingMenu from "../../components/shopping/shopping-menu";
import ShoppingProdutoFiltro from "../../components/shopping/shopping-produto-filtro";
import ShoppingProdutoItem from "../../components/shopping/shopping-produto-item";


import { useSearchParams } from "react-router-dom";
import Select from '../../components/ui/Select';
import { opcaoDeOrdenar } from "../../config/formulario-config";
import './styles/shopping-listagem.css';


function createSearchParamsHelper(filterParam) {
    const queryParams = []

    for(const [key, value] of Object.entries(filterParam)) {
        if (Array.isArray(value) && value.length > 0) {
            const paramValue = value.join(',')
            queryParams.push(`${key}=${encodeURIComponent(paramValue)}`)
        }
    }

    return queryParams.join('&')
}

function ShoppingListagem() {

    const produto = {
        "id": 15,
        "nome": "Tênis Grand Court Alpha",
        "descricao": "Tênis Grand Court Alpha",
        "preco": 400,
        "quantidade": 100,
        "estado": true,
        "datacriacao": "2024-09-14T20:14:35",
        "ultimaAlteracao": "2024-09-14T20:14:35",
        "imagemUrl": "https://storage.googleapis.com/condominio-foto/aad1bbcb-45bd-4490-8cb5-e674ad4a12d4.avif",
        "marca": "Adidas",
        "categoria": "Calçado",
        "usuario": "Quitumba Culissander Cordeiro Ferreira"
    }

    const produtos = [produto, produto, produto, produto, produto]
    const [searchParams, setSearchParams] = useSearchParams()
    const [filtro, setFiltro] = useState([])

    useEffect(() => {
        if (filtro && Object.keys(filtro).length > 0 ) {
            const createQueryString = createSearchParamsHelper(filtro)
            setSearchParams(new URLSearchParams(createQueryString))
        }
    }, [filtro])

    useEffect(() => {
        setFiltro(JSON.parse(sessionStorage.getItem('filters')))
    }, [])

    function salvaFiltro(key, nome, id) {
        console.log(key, id, nome);

        let copyFilters = { ...filtro }

        const indexOfCurrentSection = Object.keys(copyFilters).indexOf(key)

        if (indexOfCurrentSection  === -1) {
            copyFilters = {
                ...copyFilters,
                [key]: [id]
            }
        } else {
            const indexOfCurrenteOption = copyFilters[key].indexOf(id)
            if(indexOfCurrenteOption === -1) {
                copyFilters[key].push(id)
            }
            else {
                copyFilters[key].splice(indexOfCurrenteOption, 1)
            }
        }

        setFiltro(copyFilters)
        console.log(filtro);
        sessionStorage.setItem('filters', JSON.stringify(copyFilters))
    }
    
    return (
        <>
            <div>
                <ShoppingMenu/>
            </div>
            <div className="shopping-listagem">
                <div className="filtro">
                    <ShoppingProdutoFiltro filtros={filtro} handlerFilters={salvaFiltro}/>
                </div>
                <div>
                <div className="listagem-produto">
                    <h2>Todos os produtos</h2>
                    <div  className="ordenar">
                        <span>{1 > 0 ? `${1} produto(s)` : ''}</span>
                        <div>
                                <Select onChange={(event) => handlerSort(event.target.value)}>
                                    {
                                        opcaoDeOrdenar.map(sortItem =>  <option key={sortItem.id} value={sortItem.id}>{sortItem.name}</option>)
                                    }
                                    
                                </Select>
                        </div>
                    </div>
                </div>
                <div className='home-produto'>
                    {
                        produtos && produtos.length > 0 ? 
                            produtos.map(produto => <ShoppingProdutoItem key={produto.id} produto={produto} />)
                            : null
                    }
                </div>
                </div>
                
            </div>
            
        </>
    )
}

export default ShoppingListagem;