export type mapaDeCarga = {
    codigo: number;
    dataEmissao: number;
    envio_pesquisa: boolean;
    total?: number;
    andamento?: number;
    sete_dias?: number;
    cliente: cliente;
};
export type cliente = {
    codigo: number;
    razaoSocial: string;
    latitude: number;
    longitude: number;
    pedido: pedido;
};
export type pedido = {
    codigo: number;
    vendaCodigo: number;
    numeroNF: string;
    quantidadeItens: number;
    data_entrega: number;
    enviadoComprovante: boolean;
    status: number;
    statusEntrega: number;
    dataTransmitido: number;
    selecionado: boolean;
    item: item;
};
export type item = {
    produtoCodigo: number;
    produtoDescricao: string;
    quantidade: number;
    codigoEAN: string;
    referencia: string;
    descricaoGrupo: string;
    descricaoSubGrupo: string;
    quimico: number;
    guidImagem: string;
    urlImagem: string;
};
