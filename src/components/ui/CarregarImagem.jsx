import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react"
import { useRef } from "react"
import Botao from "./Botao"
import Input from "./Input"
import Label from "./Label"

import './styles/CarregarImagem.css'

function CarregarImagem ({imagem, setImagem}) {

    const inputRef = useRef(null)

    function alterarImagem(event) {
        const imagemSelecionado = event.target.files?.[0]
        if (imagemSelecionado) setImagem(imagemSelecionado)
    }

    function onDrop (event) {
        event.preventDefault()
        const droppedFile = event.dataTransfer.files?.[0]
        if (droppedFile) setImagem(droppedFile)
    }

    function onDragOver(event) {
        event.preventDefault()
    }

    function removerImagem() {
        setImagem(null)
        if (inputRef.current)
            inputRef.current.value = ''
    }

    return (
        <div className="carregar-imagem">
            <Label className='titulo'>Carregar Imagem</Label>
            <div className="drop" onDragOver={onDragOver} onDrop={onDrop}>
                <Input id='carregar-imagem' type='file' ref={inputRef} onChange={alterarImagem}/>
                {
                    !imagem ?
                    <Label htmlFor="carregar-imagem" className='label'>
                        <UploadCloudIcon size={50} />
                        <span>Arrasta aqui ou Clique para carregar a imagem</span>
                    </Label> : 
                    <div className="setImagem">
                        <div>
                            <FileIcon className="icon" size={30}/>
                        </div>
                        <p>{imagem?.name}</p>
                        <Botao onClick={removerImagem}>
                            <XIcon/>
                            <span>Remover</span>
                        </Botao>
                    </div>
                }
            </div>
        </div>
    )
}

export default CarregarImagem