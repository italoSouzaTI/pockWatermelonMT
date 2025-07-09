import { tableSchema } from "@nozbe/watermelondb";
import { nomeTabela } from "../nomeTabelas";

export const jornadaDoClienteSchema = tableSchema({
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
});
