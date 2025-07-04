import { tableSchema } from "@nozbe/watermelondb";
import { nomeTabela } from "../nomeTabelas";

export const itemPedidoSchema = tableSchema({
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
});
