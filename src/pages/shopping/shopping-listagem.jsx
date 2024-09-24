import { useEffect, useState } from "react";
import ShoppingMenu from "../../components/shopping/shopping-menu";
import ShoppingProdutoFiltro from "../../components/shopping/shopping-produto-filtro";
import ShoppingProdutoItem from "../../components/shopping/shopping-produto-item";


import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Select from '../../components/ui/Select';
import { opcaoDeOrdenar } from "../../config/formulario-config";
import { adicionarProdutoNoCarrinho } from "../../redux/carrinho-slice/carrinho-slice";
import { buscarTodosPeloFiltro, buscaTodosProdutos } from "../../redux/produto-slice/produto-slice";
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

    const {produtos} = useSelector(state => state.produtos)
    const dispatch = useDispatch()
    const [sortAtributo, setSortAtributo] = useState('nome')
    const [searchParams, setSearchParams] = useSearchParams()
    const [sortAscendente, setSortAscendente] = useState(true)
    const [filtro, setFiltro] = useState({})
    const [filtersParaCliente, setFiltersParaCliente] = useState({})
    
    useEffect(() => {
        // dispatch(buscaTodosProdutos({sortAtributo, sortAscendente}))
        buscaGeral()
    }, [dispatch])

    useEffect(() => {
        // dispatch(buscaTodosProdutos({sortAtributo, sortAscendente}))
        buscaGeral()
    }, [sortAscendente, sortAtributo])

    function onSubmit(produto) {
        dispatch(adicionarProdutoNoCarrinho(produto))
    }

    useEffect(() => {
        console.log('2');
        if (filtersParaCliente && Object.keys(filtersParaCliente).length > 0 ) {
            const createQueryString = createSearchParamsHelper(filtersParaCliente)
            setSearchParams(new URLSearchParams(createQueryString))
        }
    }, [filtersParaCliente])

 

    function handlerSort(value) {
        console.log(value);
        
        switch(value) {
            case 'preco-baixoParaAlto': 
                setSortAtributo('preco')
                setSortAscendente(true) 
                break
            case 'preco-AltoParaBaixo': 
                setSortAtributo('preco')
                setSortAscendente(false) 
                break
            case 'nome-AParaZ': 
                setSortAtributo('nome')
                setSortAscendente(true) 
                break
            case 'nome-ZParaA': 
                setSortAtributo('nome')
                setSortAscendente(false) 
                break
        }
    }

    function salvaFiltro(key, nome, id) {
        console.log(key, id, nome);

        let copyFilters = { ...filtro }
        let copyFiltersParaCliente = { ...filtersParaCliente }


        const indexOfCurrentSection = Object.keys(copyFilters).indexOf(key)

        if (indexOfCurrentSection  === -1) {
            copyFilters = {
                ...copyFilters,
                [key]: [id]
            }

            copyFiltersParaCliente = {
                ...copyFiltersParaCliente,
                [key]: [nome]
            }

        } else {
            const indexOfCurrenteOption = copyFilters[key].indexOf(id)
            if(indexOfCurrenteOption === -1) {
                copyFilters[key].push(id)
                copyFiltersParaCliente[key].push(nome)
            }
            else {
                copyFilters[key].splice(indexOfCurrenteOption, 1)
                copyFiltersParaCliente[key].splice(indexOfCurrenteOption, 1)
            }
        }

        setFiltersParaCliente(copyFiltersParaCliente)
        setFiltro(copyFilters)
        console.log(filtro);
        sessionStorage.setItem('filters', JSON.stringify(copyFilters))
        sessionStorage.setItem('filters-cliente', JSON.stringify(copyFiltersParaCliente))
    }

    useEffect(() => {
        buscaGeral()
    }, [filtro])

    function buscaGeral() {
        if (filtro === null || JSON.stringify(filtro) === '{}' ||
            JSON.stringify(filtro) === '{"Marcas":[],"Categorias":[]}' ||
            JSON.stringify(filtro) === '{"Marcas":[]}' ||
            JSON.stringify(filtro) === '{"Categorias":[]}') {
            dispatch(buscaTodosProdutos({sortAtributo, sortAscendente}))
        } else {
            dispatch(buscarTodosPeloFiltro({filtro, sortAtributo, sortAscendente}))
        }
    }

    useEffect(() => {
        setFiltro(JSON.parse(sessionStorage.getItem('filters')))
        setFiltersParaCliente(JSON.parse(sessionStorage.getItem('filters-cliente')))
    }, [])
    
    return (
        <>
            <div>
                <ShoppingMenu filtro={filtro} setFiltro={setFiltro}/>
            </div>
            <div className="shopping-listagem">
                <div className="filtro">
                    <ShoppingProdutoFiltro filtros={filtro} handlerFilters={salvaFiltro}/>
                </div>
                <div>
                <div className="listagem-produto">
                    <h2>Todos os produtos</h2>
                    <div  className="ordenar">
                        <span>{produtos.length > 0 ? `${produtos.length} produto(s)` : ''}</span>
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
                        produtos.map(produto => <ShoppingProdutoItem key={produto.id} produto={produto} onSubmit={onSubmit} />)
                            : null
                    }
                </div>
                </div>
                
            </div>
            
        </>
    )
}

export default ShoppingListagem;