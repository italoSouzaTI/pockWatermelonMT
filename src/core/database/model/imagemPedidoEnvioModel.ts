import { Model, Relation } from "@nozbe/watermelondb";
import { nomeTabela } from "../nomeTabelas";
import { field, relation } from "@nozbe/watermelondb/decorators";
import { EntregaDoPedidoModel } from "./entregaDoPedidoModel";

export class imagemPedidoEnvioModel extends Model {
    static table = nomeTabela.imagemPedidoEnvio;

    static associations = {
        [nomeTabela.entregaDoPedido]: { type: "belongs_to", foreignKey: "entrega_do_pedido" },
    };

    @field("imagem_pedido_envio_url") imagem_pedido_envio_url!: string;

    @relation(nomeTabela.entregaDoPedido, "entrega_do_pedido") pedido_venda_codigo!: Relation<EntregaDoPedidoModel>;
}
