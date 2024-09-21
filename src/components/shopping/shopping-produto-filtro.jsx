import { opcaoDoFiltro } from "../../config/formulario-config";
import Label from '../ui/Label';
import './styles/shopping-produto.filtro.css';

function ShoppingProdutoFiltro({filtros, handlerFilters}) {



    return (
        <div className="produto-filtro">
            <div className="cabecalho">
                <h2>Filtros</h2>
            </div>
            <div className="detalhe-filtro">
                {
                    Object.keys(opcaoDoFiltro).map(keyItem =><>
                        <div>
                            <h3 key={keyItem}>{keyItem}</h3>
                            <div className="check-filtro">
                                {
                                    opcaoDoFiltro[keyItem].map(option=> 
                                        <Label>
                                            <input type='checkbox' onChange={() => handlerFilters(keyItem, option.nome, option.id)}
                                            // checked = {
                                            //     filtros && Object.keys(filtros).length > 0 &&
                                            //     filtros[keyItem] && filtros[keyItem].indexOf(option.id) > -1
                                            // }
                                            />
                                            {/* {console.log(filtros[keyItem].indexOf(id))} */}
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