import { tableSchema } from "@nozbe/watermelondb";
import { nomeTabela } from "../nomeTabelas";

export const entregaDoPedidoSchema = tableSchema({
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
});
