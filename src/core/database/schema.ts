import { appSchema, tableSchema } from "@nozbe/watermelondb";
import { VERSAO_MIGRATION } from "./constants";
import { empresa } from "./tabelas/Empresa";

export default appSchema({
    version: VERSAO_MIGRATION,
    tables: [empresa],
});
