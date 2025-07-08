import { Model, Relation } from "@nozbe/watermelondb";
import { field, relation } from "@nozbe/watermelondb/decorators";
import { nomeTabela } from "../nomeTabelas";
import { PedidoModel } from "./pedidoModel";

export class ItemPedidoModel extends Model {
    static table = nomeTabela.itemPedido;
    static associations = {
        [nomeTabela.pedido]: { type: "belongs_to", foreignKey: "pedido_id" },
    };

    @field("item_pedido_produto_codigo") item_pedido_produtoCodigo!: number;
    @field("item_pedido_produto_descricao") item_pedido_produtoDescricao!: string;
    @field("item_pedido_quantidade") item_pedido_quantidade!: number;
    @field("item_pedido_codigo_ean") item_pedido_codigoEan!: string;
    @field("item_pedido_referencia") item_pedido_referencia!: string;
    @field("item_pedido_descricao_grupo") item_pedido_descricaoGrupo!: string;
    @field("item_pedido_descricao_sub_grupo") item_pedido_descricaoSubGrupo!: string;
    @field("item_pedido_quimico") item_pedido_quimico!: boolean;
    @field("item_pedido_guid_imagem") item_pedido_guidImagem!: string;
    @field("item_pedido_url_imagem") item_pedido_urlImagem!: string;

    @relation(nomeTabela.pedido, "pedido_id") pedido!: Relation<PedidoModel>;
}
