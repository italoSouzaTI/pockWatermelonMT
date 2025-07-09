import { Model, Relation } from "@nozbe/watermelondb";
import { field, relation } from "@nozbe/watermelondb/decorators";
import { nomeTabela } from "../nomeTabelas";
import { PedidoModel } from "./pedidoModel";
import { EmpresaModel } from "./empresaModel";

export class ItemPedidoModel extends Model {
    static table = nomeTabela.itemPedido;
    static associations = {
        [nomeTabela.pedido]: { type: "belongs_to", foreignKey: "pedido_id" },
        [nomeTabela.empresa]: { type: "belongs_to", foreignKey: "empresa_id" },
    };

    @field("item_pedido_produto_codigo") item_pedido_produto_codigo!: number;
    @field("item_pedido_produto_descricao") item_pedido_produto_descricao!: string;
    @field("item_pedido_quantidade") item_pedido_quantidade!: number;
    @field("item_pedido_codigo_ean") item_pedido_codigo_ean!: string;
    @field("item_pedido_referencia") item_pedido_referencia!: string;
    @field("item_pedido_descricao_grupo") item_pedido_descricao_grupo!: string;
    @field("item_pedido_descricao_sub_grupo") item_pedido_descricao_sub_grupo!: string;
    @field("item_pedido_quimico") item_pedido_quimico!: boolean;
    @field("item_pedido_guid_imagem") item_pedido_guid_imagem!: string;
    @field("item_pedido_url_imagem") item_pedido_url_imagem!: string;

    @relation(nomeTabela.pedido, "pedido_id") pedido_id!: Relation<PedidoModel>;
    @relation(nomeTabela.empresa, "empresa_id") empresa_id!: Relation<EmpresaModel>;
}
