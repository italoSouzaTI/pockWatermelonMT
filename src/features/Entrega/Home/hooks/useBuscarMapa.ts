import { Q } from "@nozbe/watermelondb";
import { database } from "../../../../core/database";
import { ClienteModel, EmpresaModel, MapaDeCargaModel, PedidoModel } from "../../../../core/database/model";
import { nomeTabela } from "../../../../core/database/nomeTabelas";
import DATAMOCK from "../../../../core/MOCK/mapa.json";
import { cliente, mapaDeCarga, pedido } from "../../../../core/types/mapaDeCarga";
function existeMapa(mapasNoDB: string[], codigo: string): boolean {
    return mapasNoDB.includes(codigo);
}
export async function BuscandoMapas() {
    try {
        const mapasNoDB = (await database.get(nomeTabela.mapaDeCarga).query().fetch()).map((ctx) =>
            String(ctx.mapa_id)
        );
        const existeEmpresas = (await database.get(nomeTabela.empresa).query().fetch()).length;
        if (existeEmpresas == 0) {
            BuscandoMapas();
            return;
        }
        for (const element of DATAMOCK) {
            const codigoMapa = String(element.codigo);

            if (!existeMapa(mapasNoDB, codigoMapa)) {
                // console.warn(`Mapa ${codigoMapa} não existe, inserindo...`);
                const clientesID = await inserindoClientes(element.cliente);
                await inserirMapa(element, clientesID);
            } else {
                // console.warn(`Mapa ${codigoMapa} já existe, pulando...`);
            }
        }
    } catch (error) {}
}
async function inserindoClientes(clientes: cliente[]): Promise<{ cliente: ClienteModel; pedido: pedido }[]> {
    try {
        let arrayClienteID = [] as { cliente: ClienteModel; pedido: pedido }[];
        for (const element of clientes) {
            const idCliente = await database.write(async () => {
                return await database.collections.get<ClienteModel>(nomeTabela.cliente).create((ctx) => {
                    ctx.cliente_codigo = element.codigo;
                    ctx.cliente_razao_social = element.razaoSocial;
                    ctx.cliente_latitude = element.clienteLatitude;
                    ctx.cliente_longitude = element.clienteLongitude;
                });
            });
            arrayClienteID.push({
                cliente: idCliente,
                pedido: element.pedido,
            });
        }
        return arrayClienteID;
    } catch (error) {
        return [];
    }
}
async function inserirMapa(mapa: MapaDeCargaModel, clientes: { cliente: ClienteModel; pedido: pedido }[]) {
    try {
        const empresaAtual = await database
            .get(nomeTabela.empresa)
            .query(Q.where("empresa_codigo", mapa.empresa))
            .fetch();
        if (empresaAtual.length === 0) {
            throw new Error("Empresa não encontrada");
        }

        const idsClientes = clientes.map((item) => item.cliente.id);
        const empresa = empresaAtual[0];

        let mapaCriado: MapaDeCargaModel;
        mapaCriado = await database.write(async () => {
            try {
                return database.collections.get<MapaDeCargaModel>(nomeTabela.mapaDeCarga).create((mapaRecord) => {
                    mapaRecord.mapa_id = Number(mapa.codigo);
                    mapaRecord.mapa_data_emissao = new Date(mapa.dataEmissao).getTime();
                    mapaRecord.mapa_envio_pesquisa = false;
                    mapaRecord.mapa_total = clientes.length;
                    mapaRecord.mapa_andamento = 0;
                    mapaRecord.mapa_sete_dias = 0;
                    // Campo JSON com IDs dos clientes
                    mapaRecord.mapa_cliente_id = idsClientes;

                    // CORREÇÃO DA RELAÇÃO - usar o ID da empresa
                    mapaRecord.empresa_id.set(empresa);
                });
            } catch (innerError) {
                console.error("Erro ao criar mapa:", innerError);
                throw innerError;
            }
        });
        await inserirPedidos(mapaCriado, empresa, clientes);
    } catch (error) {
        console.error("Erro geral em inserirMapa:", error);
        throw error;
    }
}
async function inserirPedidos(
    mapaAtual: MapaDeCargaModel,
    empresaAtual: EmpresaModel,
    clientes: { cliente: ClienteModel; pedido: pedido }[]
) {
    try {
        if (!Array.isArray(clientes)) {
            throw new Error("Parâmetro 'clientes' deve ser um array");
        }

        const resultados = [];

        for (const { cliente, pedido: pedidos } of clientes) {
            if (!pedidos || !Array.isArray(pedidos)) {
                // console.warn(`Cliente ${cliente.id} sem pedidos válidos`);
                continue;
            }

            for (const element of pedidos) {
                try {
                    const pedidoCriado = await database.write(async () => {
                        return await database.collections.get<PedidoModel>(nomeTabela.pedido).create((pedido) => {
                            // Campos normais
                            pedido.pedido_venda_codigo = element.vendaCodigo;
                            pedido.pedido_numero_nf = element.numeroNF;
                            pedido.pedido_quantidade_itens = element.quantidadeItens;
                            pedido.pedido_data_entrega = new Date("0001-01-01T00:00:00").getTime();
                            pedido.pedido_enviado_comprovante = false;
                            pedido.pedido_status = element.status;
                            pedido.pedido_status_entrega = element.statusEntrega;
                            pedido.pedido_data_transmitido = 0;
                            pedido.pedido_selecionado = false;

                            // RELAÇÕES (usando IDs)
                            pedido.cliente_id.set(cliente);
                            pedido.mapa_id.set(mapaAtual);
                            pedido.empresa_id.set(empresaAtual);
                        });
                    });

                    resultados.push({
                        id: pedidoCriado.id,
                        status: "sucesso",
                        dados: element,
                    });

                    if (element.item) {
                        await inserirItemPedido(pedidoCriado, element.item, empresaAtual);
                    }
                } catch (error) {
                    console.error(`Erro ao inserir pedido para cliente ${cliente.id}:`, error);
                    resultados.push({
                        clienteId: cliente.id,
                        status: "erro",
                        error: error.message,
                    });
                }
            }
        }

        return resultados;
    } catch (error) {
        console.error("Erro geral ao inserir pedidos:", error);
        throw error;
    }
}
async function inserirItemPedido(pedidoId: string, itemAtual: [], empresa: MapaDeCargaModel) {
    try {
        for (const element of itemAtual) {
            try {
                let itens = await database.write(async () => {
                    return database.collections.get(nomeTabela.itemPedido).create((item) => {
                        item.item_pedido_produto_codigo = element.produtoCodigo;
                        item.item_pedido_produto_descricao = element.produtoDescricao;
                        item.item_pedido_quantidade = element.quantidade;
                        item.item_pedido_codigo_ean = element.codigoEAN;
                        item.item_pedido_referencia = element.referencia;
                        item.item_pedido_descricao_grupo = element.descricaoGrupo;
                        item.item_pedido_descricao_sub_grupo = element.descricaoSubGrupo;
                        item.item_pedido_quimico = element.quimico;
                        item.item_pedido_guid_imagem = element.guidImagem;
                        item.item_pedido_url_imagem = element.urlImagem;
                        item.pedido_id.set(pedidoId);
                        item.empresa_id.set(empresa);
                    });
                });
            } catch (error) {
                console.error("Erro interno em inserirItemPedido:", error);
            }
        }
    } catch (error) {
        console.error("Erro geral em inserirItemPedido:", error);
    }
}
async function resetTable(tabela: string) {
    await database.write(async () => {
        // Deleta TODOS os registros da tabela de forma permanente
        await database.collections
            .get(tabela)
            .query(Q.unsafeSqlQuery(`SELECT * FROM ${tabela}`)) // Pega todos os registros
            .destroyAllPermanently(); // Deleta todos
    });
}
