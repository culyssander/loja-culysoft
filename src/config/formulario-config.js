export const controlLoginFormulario = [
    {
        nome: 'email',
        titulo: 'Email',
        placeholder: 'Email',
        tipoDoComponente: 'input',
        tipo: 'email'
    },
    {
        nome: 'senha',
        titulo: 'Senha',
        placeholder: 'Senha',
        tipoDoComponente: 'input',
        tipo: 'password'
    },
]

export const controlRegistroFormulario = [
    {
        nome: 'nome',
        titulo: 'Nome',
        placeholder: 'Nome',
        tipoDoComponente: 'input',
        tipo: 'text'
    },
    {
        nome: 'email',
        titulo: 'Email',
        placeholder: 'Email',
        tipoDoComponente: 'input',
        tipo: 'email'
    },
    {
        nome: 'senha',
        titulo: 'Senha',
        placeholder: 'Senha',
        tipoDoComponente: 'input',
        tipo: 'password'
    },
]

export let contraladorDoFormularioAdminProduto = [
    {
        nome: 'nome',
        titulo: 'Nome *',
        placeholder: 'Digite o nome do produto',
        tipoDoComponente: 'input',
        tipo: 'text'
    },
    {
        nome: 'descricao',
        titulo: 'Descrição',
        placeholder: 'Digite a descrição do produto',
        tipoDoComponente: 'textarea',
    },
    {
        nome: 'categoria',
        titulo: 'Categoria *',
        tipoDoComponente: 'select',
        opcao: []
        // [
        //     {id: 'tenis', nome: 'Tenis'},
        //     {id: 'homem', nome: 'Homem'}
        // ]
    },
    {
        nome: 'marca',
        titulo: 'Marca',
        tipoDoComponente: 'select',
        opcao: []
        // [
        //     {id: 'adidas', nome: 'Adidas'},
        //     {id: 'nike', nome: 'Nike'}
        // ]
    },
    {
        nome: 'preco',
        titulo: 'Preço *',
        placeholder: 'Digite o preço do produto',
        tipoDoComponente: 'input',
        tipo: 'number'
    },
    {
        nome: 'quantidade',
        titulo: 'Quantidade *',
        placeholder: 'Quantidade',
        tipoDoComponente: 'input',
        tipo: 'number'
    },
    
]

export const cabecalhoDaTabelaVenda = ['#', 'Nome', 'Descrição', 'Preço', 'Estado', '']

export const shoppingMenuOpcoes = [
    {
        id: 'homem',
        titulo: 'Homem',
        link: '/listagem?categoria=homem'
    },
    {
        id: 'mulher',
        titulo: 'Mulher',
        link: '/listagem?categoria=mulher'
    },
    {
        id: 'crianca',
        titulo: 'Criança',
        link: '/listagem?categoria=crianca'
    },
    {
        id: 'acessorio',
        titulo: 'Acessórios',
        link: '/listagem?categoria=acessorio'
    },
    {
        id: 'calcado',
        titulo: 'Calçado',
        link: '/listagem?categoria=calcado'
    }
]

export const opcaoDoFiltro = {
    category: [
            { id: 'homem', nome: 'Homem'},
            { id: 'mulher', nome: 'Mulher'},
            { id: 'kids', nome: 'Kids'},
            { id: 'acessorios', nome: 'Acessorios'},
            { id: 'calcado', nome: 'Calçado'},
        ],
    brand: [
            { id: 'nike', nome: 'Nike'},
            { id: 'adidas', nome: 'Adidas'},
            { id: 'puma', nome: 'Puma'},
            { id: 'levi', nome: 'Levis'},
            { id: 'zara', nome: 'Zara'},
        ]
}

export const opcaoDeOrdenar = [
    {id : 'nome-AParaZ', name: 'Nome: De A para Z'},
    {id : 'nome-ZParaA', name: 'Nome: De Z para A'},
    {id : 'preco-baixoParaAlto', name: 'Preço: baixo para alto'},
    {id : 'preco-AltoParaBaixo', name: 'Preço: alto para baixo'},
]

export const moradaDeEntrega = [
    {
        nome: 'rua',
        titulo: 'Rua *',
        placeholder: 'Digite o nome da rua',
        tipoDoComponente: 'input',
        tipo: 'text'
    },
    {
        nome: 'numero',
        titulo: 'Numero *',
        placeholder: 'Digite o numero da casa',
        tipoDoComponente: 'input',
        tipo: 'number'
    },
    {
        nome: 'complemento',
        titulo: 'Complemento',
        placeholder: 'Digite o completo',
        tipoDoComponente: 'input',
        tipo: 'text'
    },
]


export const pagamentoDoCompra = [
    {
        nome: 'numeroCartao',
        titulo: 'Numero do cartão *',
        placeholder: 'Numero do cartão',
        tipoDoComponente: 'input',
        tipo: 'text'
    },
    {
        nome: 'expiracao',
        titulo: 'Expiração *',
        placeholder: 'MM/YYYY',
        tipoDoComponente: 'input',
        tipo: 'text'
    },
    {
        nome: 'cvc',
        titulo: 'CVC *',
        placeholder: 'CVC',
        tipoDoComponente: 'input',
        tipo: 'number'
    },
    {
        nome: 'nome',
        titulo: 'Nome Completo *',
        placeholder: 'Nome completo',
        tipoDoComponente: 'input',
        tipo: 'text'
    },
]

export const editarPerfilDoUsuario = [
    {
        nome: 'nome',
        titulo: 'Nome Completo',
        placeholder: 'Nome Completo',
        tipoDoComponente: 'input',
        tipo: 'text'
    },
    {
        nome: 'senha',
        titulo: 'Senha',
        placeholder: 'Senha',
        tipoDoComponente: 'input',
        tipo: 'password'
    },
    {
        nome: 'confirmaSenha',
        titulo: 'Confirma a senha',
        placeholder: 'Confirma a senha',
        tipoDoComponente: 'input',
        tipo: 'password'
    },
    {
        nome: 'email',
        titulo: 'Email',
        placeholder: 'email',
        tipoDoComponente: 'input',
        tipo: 'email'
    },
]

export const colunasDasComprasDoCliente = ["#", "Produtos", "Total", "Estado", "Data de registro"]