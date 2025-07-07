import { useEffect } from "react";
import { buscandoTodasEmpresas } from "./hooks/useBuscarTodasEmpresa";
import DATAMOCK from "../../../core/MOCK/mapa.json";
import { cliente, mapaDeCarga, pedido } from "../../../core/types/mapaDeCarga";
import { database } from "../../../core/database";
import { nomeTabela } from "../../../core/database/nomeTabelas";
import { Q } from "@nozbe/watermelondb";
import { MapaDeCargaModel, PedidoModel } from "../../../core/database/model";
export function useModelView() {
    function existeMapa(mapasNoDB: string[], codigo: string): boolean {
        return mapasNoDB.includes(codigo);
    }
    async function BuscandoMapas() {
        try {
            // await resetTable(nomeTabela.cliente);
            // await resetTable(nomeTabela.mapaDeCarga);
            // await resetTable(nomeTabela.pedido);
            // await resetTable(nomeTabela.itemPedido);
            const mapasNoDB = (await database.get(nomeTabela.mapaDeCarga).query().fetch()).map((ctx) =>
                String(ctx.mapa_id)
            );
            console.log("mapasNoDB", mapasNoDB);
            for (const element of DATAMOCK) {
                const codigoMapa = String(element.codigo);

                if (!existeMapa(mapasNoDB, codigoMapa)) {
                    console.log(`Mapa ${codigoMapa} não existe, inserindo...`);
                    const clientesID = await inserindoClientes(element.cliente);
                    await inserirMapa(element, clientesID);
                } else {
                    console.log(`Mapa ${codigoMapa} já existe, pulando...`);
                }
            }
        } catch (error) {}
    }
    async function inserindoClientes(clientes: cliente[]): Promise<{ id_cliente: string; pedido: pedido }[]> {
        try {
            let arrayClienteID = [] as { id_cliente: string; pedido: pedido }[];
            for (const element of clientes) {
                const idCliente = await database.write(async () => {
                    return await database.collections.get(nomeTabela.cliente).create((ctx) => {
                        ctx.cliente_codigo = element.codigo;
                        ctx.cliente_razao_social = element.razaoSocial;
                        ctx.cliente_latitude = element.clienteLatitude;
                        ctx.cliente_longitude = element.clienteLongitude;
                    });
                });
                console.log("idCliente", idCliente);
                arrayClienteID.push({
                    id_cliente: idCliente.id,
                    pedido: element.pedido,
                });
            }
            return arrayClienteID;
        } catch (error) {
            return [];
        }
    }
    async function inserirMapa(mapa: mapaDeCarga, clientes: { id_cliente: string; pedido: pedido }[]) {
        try {
            const empresaAtual = await database
                .get(nomeTabela.empresa)
                .query(Q.where("empresa_codigo", mapa.empresa))
                .fetch();

            if (empresaAtual.length === 0) {
                throw new Error("Empresa não encontrada");
            }

            const idCliente = clientes.map((item) => ({ id: item.id_cliente }));
            const empresa = empresaAtual[0];

            let mapaCriado: MapaDeCargaModel;
            console.log("mapa", mapa);
            mapaCriado = await database.write(async () => {
                try {
                    return database.collections.get<MapaDeCargaModel>(nomeTabela.mapaDeCarga).create((mapaRecord) => {
                        mapaRecord.mapa_id = Number(mapa.codigo);
                        mapaRecord.mapa_data_emissao = new Date(mapa.dataEmissao).getTime();
                        mapaRecord.mapa_envio_pesquisa = false;
                        mapaRecord.mapa_total = clientes.length;
                        mapaRecord.mapa_andamento = 0;
                        mapaRecord.mapa_sete_dias = 0;
                        mapaRecord.empresa.set(empresa.id);
                        mapaRecord.mapa_cliente_id = idCliente;
                    });
                } catch (innerError) {
                    console.error("Erro ao criar mapa:", innerError);
                    throw innerError;
                }
            });
            console.log("mapaCriado", mapaCriado);
            await inserirPedidos(mapaCriado.id, empresa.id, clientes);
        } catch (error) {
            console.error("Erro geral em inserirMapa:", error);
            throw error;
        }
    }
    async function inserirPedidos(
        mapaId: string,
        empresaId: string,
        clientes: { id_cliente: string; pedido: pedido }[]
    ) {
        try {
            for (const element of clientes) {
                let pedido = await database.write(async () => {
                    try {
                        return database.collections.get(nomeTabela.pedido).create((pedido) => {
                            pedido.pedido_venda_codigo = element.pedido[0].vendaCodigo;
                            pedido.pedido_numero_nf = element.pedido[0].numeroNF;
                            pedido.pedido_quantidade_itens = element.pedido[0].quantidadeItens;
                            pedido.pedido_data_entrega = new Date("0001-01-01T00:00:00").getTime();
                            pedido.pedido_enviado_comprovante = false;
                            pedido.pedido_status = element.pedido[0].status;
                            pedido.pedido_status_entrega = element.pedido[0].statusEntrega;
                            pedido.pedido_data_transmitido = 0;
                            pedido.pedido_selecionado = false;
                            pedido.cliente_id = element.id_cliente;
                            pedido.mapa_id = mapaId;
                            pedido.empresa_id = empresaId;
                        });
                    } catch (error) {
                        console.log("error ao inserir pedido", error);
                    }
                });
                await inserirItemPedido(pedido.id, element.pedido[0].item);
            }
        } catch (error) {
            console.log("pedido geral", error.message);
        }
    }
    async function inserirItemPedido(pedidoId: string, itemAtual: []) {
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
                            item.pedido_id = pedidoId;
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
    useEffect(() => {
        buscandoTodasEmpresas();
        BuscandoMapas();
    }, []);
    return {};
}
