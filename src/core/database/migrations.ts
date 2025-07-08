import { createTable, schemaMigrations } from "@nozbe/watermelondb/Schema/migrations";
import { nomeTabela } from "./nomeTabelas";

export default schemaMigrations({
    migrations: [
        {
            toVersion: 2,
            steps: [
                createTable({
                    name: nomeTabela.empresa,
                    columns: [
                        { name: "empresa_id", type: "number" },
                        { name: "empresa_codigo", type: "number" },
                        { name: "empresa_cnpj", type: "string" },
                        { name: "empresa_razao_social", type: "string" },
                        { name: "empresa_fantasia", type: "string" },
                        { name: "empresa_ativa", type: "boolean" },
                    ],
                }),
            ],
        },
        {
            toVersion: 3,
            steps: [
                createTable({
                    name: nomeTabela.cliente,
                    columns: [
                        { name: "cliente_codigo", type: "number" },
                        { name: "cliente_razao_social", type: "string" },
                        { name: "cliente_latitude", type: "number" },
                        { name: "cliente_longitude", type: "number" },
                    ],
                }),
                createTable({
                    name: nomeTabela.itemPedido,
                    columns: [
                        { name: "item_pedido_produto_codigo", type: "number" },
                        { name: "item_pedido_produto_descricao", type: "string" },
                        { name: "item_pedido_quantidade", type: "number" },
                        { name: "item_pedido_codigo_ean", type: "string" },
                        { name: "item_pedido_referencia", type: "string" },
                        { name: "item_pedido_descricao_grupo", type: "string" },
                        { name: "item_pedido_descricao_sub_grupo", type: "string" },
                        { name: "item_pedido_quimico", type: "boolean" },
                        { name: "item_pedido_guid_imagem", type: "string", isOptional: true },
                        { name: "item_pedido_url_imagem", type: "string", isOptional: true },
                        { name: "pedido_id", type: "string" },
                    ],
                }),
                createTable({
                    name: nomeTabela.mapaDeCarga,
                    columns: [
                        { name: "mapa_id", type: "number" },
                        { name: "mapa_data_emissao", type: "number" },
                        { name: "mapa_envio_pesquisa", type: "boolean" },
                        { name: "mapa_total", type: "number" },
                        { name: "mapa_andamento", type: "number" },
                        { name: "mapa_sete_dias", type: "number", isOptional: true },
                        { name: "mapa_cliente_id", type: "string" },
                        { name: "empresa_id", type: "string", isIndexed: true },
                    ],
                }),
                createTable({
                    name: nomeTabela.pedido,
                    columns: [
                        { name: "pedido_emp_codigo", type: "number" },
                        { name: "pedido_venda_codigo", type: "number" },
                        { name: "pedido_numero_nf", type: "number" },
                        { name: "pedido_quantidade_itens", type: "number" },
                        { name: "pedido_data_entrega", type: "number" },
                        { name: "pedido_enviado_comprovante", type: "boolean" },
                        { name: "pedido_status", type: "number" },
                        { name: "pedido_status_entrega", type: "number" },
                        { name: "pedido_data_transmitido", type: "number", isOptional: true },
                        { name: "pedido_selecionado", type: "boolean" },
                        { name: "cliente_id", type: "string", isIndexed: true },
                        { name: "mapa_id", type: "string", isIndexed: true },
                        { name: "empresa_id", type: "string", isIndexed: true },
                    ],
                }),
            ],
        },

        // We'll add migration definitions here later
    ],
});
