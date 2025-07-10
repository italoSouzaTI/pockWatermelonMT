import { tableSchema } from "@nozbe/watermelondb";
import { nomeTabela } from "../nomeTabelas";

export const ImagemPedidoEnvioSchema = tableSchema({
    name: nomeTabela.imagemPedidoEnvio,
    columns: [
        { name: "entrega_do_pedido", type: "string" },
        { name: "imagem_pedido_envio_url", type: "string" },
    ],
});
