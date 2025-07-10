import { appSchema, tableSchema } from "@nozbe/watermelondb";
import { VERSAO_MIGRATION } from "./constants";
import { empresaSchema } from "./tabelas/Empresa";
import { itemPedidoSchema } from "./tabelas/ItemPedido";
import { clienteSchema } from "./tabelas/Cliente";
import { mapaDeCargaSchema } from "./tabelas/MapaDeCarga";
import { pedidoSchema } from "./tabelas/Pedido";
import { jornadaDoClienteSchema } from "./tabelas/jornadaCliente";
import { entregaDoPedidoSchema } from "./tabelas/EntregaDoPedido";
import { ImagemPedidoEnvioSchema } from "./tabelas/ImagemPedidoEnvio";

export default appSchema({
    version: VERSAO_MIGRATION,
    tables: [
        empresaSchema,
        itemPedidoSchema,
        clienteSchema,
        mapaDeCargaSchema,
        pedidoSchema,
        jornadaDoClienteSchema,
        entregaDoPedidoSchema,
        ImagemPedidoEnvioSchema,
    ],
});
