import { tableSchema } from "@nozbe/watermelondb";
import { nomeTabela } from "../nomeTabelas";

export const pedidoSchema = tableSchema({
    name: nomeTabela.pedido,
    columns: [
        { name: "pedido_emp_codigo", type: "number" },
        { name: "pedido_venda_codigo", type: "number" },
        { name: "pedido_numero_nf", type: "string" },
        { name: "pedido_quantidade_itens", type: "number" },
        { name: "pedido_data_entrega", type: "number" },
        { name: "pedido_enviado_comprovante", type: "boolean" },
        { name: "pedido_status", type: "number" },
        { name: "pedido_status_entrega", type: "number" },
        { name: "pedido_data_transmitido", type: "number", isOptional: true },
        { name: "pedido_selecionado", type: "boolean" },
        { name: "cliente_id", type: "string" },
        { name: "mapa_id", type: "string" },
        { name: "empresa_id", type: "string" },
    ],
});
