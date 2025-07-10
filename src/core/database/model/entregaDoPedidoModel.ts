import { Model, Relation } from "@nozbe/watermelondb";
import { nomeTabela } from "../nomeTabelas";
import { field, relation } from "@nozbe/watermelondb/decorators";
import { EmpresaModel } from "./empresaModel";
import { PedidoModel } from "./pedidoModel";

export class EntregaDoPedidoModel extends Model {
    static table = nomeTabela.entregaDoPedido;

    static associations = {
        [nomeTabela.pedido]: { type: "belongs_to", foreignKey: "pedido_venda_codigo" },
        [nomeTabela.empresa]: { type: "belongs_to", foreignKey: "pedido_empresa_id" },
    };

    @field("entrega_do_pedido_data_entrega") entrega_do_pedido_data_entrega!: number;
    @field("entrega_do_pedido_codigo_usuario") entrega_do_pedido_codigo_usuario!: number;
    @field("entrega_do_pedido_nome_celular") entrega_do_pedido_nome_celular!: string;
    @field("entrega_do_pedido_latitude") entrega_do_pedido_latitude!: number;
    @field("entrega_do_pedido_longitude") entrega_do_pedido_longitude!: number;
    @field("entrega_do_pedido_nome_recebedor") entrega_do_pedido_nome_recebedor!: string;
    @field("entrega_do_pedido_enviado_comprovante") entrega_do_pedido_enviado_comprovante!: boolean;
    @field("entrega_do_pedido_comprovante") entrega_do_pedido_comprovante!: string;

    @relation(nomeTabela.pedido, "pedido_venda_codigo") pedido_venda_codigo!: Relation<PedidoModel>;
    @relation(nomeTabela.empresa, "pedido_empresa_id") pedido_empresa_id!: Relation<EmpresaModel>;
}
