import { tableSchema } from "@nozbe/watermelondb";
import { nomeTabela } from "../nomeTabelas";

export const empresaSchema = tableSchema({
    name: nomeTabela.empresa,
    columns: [
        { name: "empresa_id", type: "number" },
        { name: "empresa_codigo", type: "number" },
        { name: "empresa_cnpj", type: "string" },
        { name: "empresa_razao_social", type: "string" },
        { name: "empresa_fantasia", type: "string" },
        { name: "empresa_ativa", type: "boolean" },
    ],
});
