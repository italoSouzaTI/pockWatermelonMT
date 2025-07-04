import { tableSchema } from "@nozbe/watermelondb";
import { nomeTabela } from "../nomeTabelas";

export const clienteSchema = tableSchema({
    name: nomeTabela.cliente,
    columns: [
        { name: "cliente_codigo", type: "number" },
        { name: "cliente_razao_social", type: "string" },
        { name: "cliente_latitude", type: "number" },
        { name: "cliente_longitude", type: "number" },
    ],
});
