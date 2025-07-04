import { appSchema, tableSchema } from "@nozbe/watermelondb";
import { VERSAO_MIGRATION } from "./constants";
import { empresaSchema } from "./tabelas/Empresa";
import { itemPedidoSchema } from "./tabelas/ItemPedido";
import { clienteSchema } from "./tabelas/Cliente";
import { mapaDeCargaSchema } from "./tabelas/MapaDeCarga";
import { pedidoSchema } from "./tabelas/Pedido";

export default appSchema({
    version: VERSAO_MIGRATION,
    tables: [empresaSchema, itemPedidoSchema, clienteSchema, mapaDeCargaSchema, pedidoSchema],
});
