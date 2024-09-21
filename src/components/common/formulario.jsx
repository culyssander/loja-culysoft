import Botao from '../ui/Botao';
import Input from '../ui/Input';
import Label from '../ui/Label';
import Select from '../ui/Select';
import TextArea from '../ui/TextArea';
import './styles/formulario.css';

function Formulario({formularioControl, formularioDados, setFormularioDados, onSubmit, textoDoBotao}) {

    function renderizarComponentePeloTipo(controlItem) {
        let elemento = null;
        const valor = formularioDados[controlItem.nome] || ''

        switch(controlItem.tipoDoComponente) {
            case 'input': elemento = (<Input 
                            className={'input'}
                            type={controlItem.tipo}
                            placeholder={controlItem.placeholder}
                            name={controlItem.nome}
                            id={controlItem.nome}
                            value={valor}
                            onChange={event => setFormularioDados({
                                ...formularioDados,
                                [controlItem.nome]: event.target.value
                            })}
                        />); break;
            case 'textarea': elemento = (<TextArea
                            name= {controlItem.nome}
                            placeholder={controlItem.placeholder}
                            id={controlItem.id}
                            value={valor}
                            onChange={event => setFormularioDados({
                                ...formularioDados,
                                [controlItem.nome]: event.target.value
                            })}
                            ></TextArea>); break;
            case 'select': elemento = (<Select onChange={event => setFormularioDados({
                ...formularioDados,
                [controlItem.nome]: event.target.value
            })} value={valor}>
                {
                    controlItem.opcao && controlItem.opcao.length > 0 ? controlItem.opcao.map(opcaoItem =>
                        <option value={opcaoItem.id} key={opcaoItem.id}>{opcaoItem.nome}</option>) : null
                }
            </Select>); break;

            default: elemento = (<Input type={controlItem.tipo} 
                            className={'input'}
                            placeholder={controlItem.placeholder}
                            name={controlItem.nome}
                            id={controlItem.nome}
                            onChange={event => {
                                if (controlItem.tipo === 'checkbox') {
                                    setFormularioDados({
                                        ...formularioDados,
                                        [controlItem.nome]: event.target.checked
                                    })
                                } else {
                                    setFormularioDados({
                                        ...formularioDados,
                                        [controlItem.nome]: event.target.value
                                    })
                                }
                            } }
                            />)
        }

        return elemento;
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="formulario">
                {
                    formularioControl.map(controlItem => (<div className="control">
                        <Label>{controlItem.titulo}</Label>
                        {
                            renderizarComponentePeloTipo(controlItem)
                        }
                    </div>))
                }
            </div>
            <div className='wrapper'>
            <Botao className="botao-formulario">{textoDoBotao || 'Submit'}</Botao>
            </div>
        </form>
    )
}

export default Formulario