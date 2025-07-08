import { tableSchema } from "@nozbe/watermelondb";
import { nomeTabela } from "../nomeTabelas";

export const mapaDeCargaSchema = tableSchema({
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
});
