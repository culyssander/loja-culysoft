import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import { opcaoDoFiltro } from "../../config/formulario-config";
import { buscarCategoriasEMarcas } from "../../redux/categoria-slice/categoria-slice";
import Label from '../ui/Label';
import './styles/shopping-produto.filtro.css';

function ShoppingProdutoFiltro({filtros, handlerFilters}) {

    const [opcaoDoFiltroDoBanco, setOpcaoDoFiltroDoBanco] = useState([])
    const dispatch = useDispatch() 

    useEffect(() => {
        dispatch(buscarCategoriasEMarcas()).then(data => setOpcaoDoFiltroDoBanco(data.payload))
    }, [])

    return (
        <div className="produto-filtro">
            <div className="cabecalho">
                <h2>Filtros</h2>
            </div>
            <div className="detalhe-filtro">
                {
                    Object.keys(opcaoDoFiltroDoBanco).map(keyItem =><>
                        <div>
                            <h3 key={keyItem}>{keyItem}</h3>
                            <div className="check-filtro">
                                {
                                    opcaoDoFiltroDoBanco[keyItem].map(option=> 
                                        <Label>
                                            <input type='checkbox' onChange={() => handlerFilters(keyItem, option.nome, option.id)}
                                            />
                                            {option.nome}
                                        </Label>
                                    )
                                }
                            </div>
                        </div>
                    </>)
                }
            </div>
        </div>
    )
}

export default ShoppingProdutoFiltro