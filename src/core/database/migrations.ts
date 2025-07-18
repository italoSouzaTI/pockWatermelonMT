import { addColumns, createTable, schemaMigrations } from "@nozbe/watermelondb/Schema/migrations";
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
        {
            toVersion: 4,
            steps: [
                addColumns({
                    table: nomeTabela.itemPedido,
                    columns: [{ name: "empresa_id", type: "string" }],
                }),
            ],
        },
        {
            toVersion: 5,
            steps: [
                createTable({
                    name: nomeTabela.jornadaDoCliente,
                    columns: [
                        { name: "jornada_do_cliente_data_inicio", type: "number" },
                        { name: "jornada_do_cliente_data_fim", type: "number", isOptional: true },
                        { name: "jornada_do_cliente_is_iniciado", type: "boolean" },
                        { name: "jornada_do_cliente_is_sincronizado", type: "boolean" },
                        { name: "jornada_do_cliente_latitude_inicio", type: "number" },
                        { name: "jornada_do_cliente_longitude_inicio", type: "number" },
                        { name: "jornada_do_cliente_latitude_fim", type: "number", isOptional: true },
                        { name: "jornada_do_cliente_longitude_fim", type: "number", isOptional: true },
                        { name: "cliente_id", type: "string", isIndexed: true },
                        { name: "mapa_de_carga_id", type: "string", isIndexed: true },
                        { name: "empresa_id", type: "string", isIndexed: true },
                    ],
                }),
            ],
        },
        {
            toVersion: 6,
            steps: [
                createTable({
                    name: nomeTabela.entregaDoPedido,
                    columns: [
                        { name: "entrega_do_pedido_data_entrega", type: "number" },
                        { name: "entrega_do_pedido_codigo_usuario", type: "number" },
                        { name: "entrega_do_pedido_nome_celular", type: "string" },
                        { name: "entrega_do_pedido_latitude", type: "number" },
                        { name: "entrega_do_pedido_longitude", type: "number" },
                        { name: "entrega_do_pedido_nome_recebedor", type: "string" },
                        { name: "entrega_do_pedido_enviado_comprovante", type: "boolean" },
                        { name: "entrega_do_pedido_comprovante", type: "string" },
                        { name: "pedido_venda_codigo", type: "string" },
                        { name: "pedido_empresa_id", type: "string" },
                    ],
                }),
            ],
        },
        {
            toVersion: 7,
            steps: [
                createTable({
                    name: nomeTabela.imagemPedidoEnvio,
                    columns: [
                        { name: "entrega_do_pedido", type: "string" },
                        { name: "imagem_pedido_envio_url", type: "string" },
                    ],
                }),
            ],
        },

        // We'll add migration definitions here later
    ],
});
