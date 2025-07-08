import { Model, Relation } from "@nozbe/watermelondb";
import { nomeTabela } from "../nomeTabelas";
import { children, field, relation } from "@nozbe/watermelondb/decorators";
import { ClienteModel } from "./clienteModel";
import { MapaDeCargaModel } from "./mapaDeCargaModel";
import { EmpresaModel } from "./empresaModel";

export class PedidoModel extends Model {
    static table = nomeTabela.pedido;

    static associations = {
        [nomeTabela.cliente]: { type: "belongs_to", foreignKey: "cliente_id" },
        [nomeTabela.mapaDeCarga]: { type: "belongs_to", foreignKey: "mapa_id" },
        [nomeTabela.empresa]: { type: "belongs_to", foreignKey: "empresa_id" },
    };

    @field("pedido_venda_codigo") pedido_venda_codigo!: number;
    @field("pedido_numero_nf") pedido_numero_nf!: string;
    @field("pedido_quantidade_itens") pedido_quantidade_itens!: number;
    @field("pedido_data_entrega") pedido_data_entrega!: number;
    @field("pedido_enviado_comprovante") pedido_enviado_comprovante!: boolean;
    @field("pedido_status") pedido_status!: number;
    @field("pedido_status_entrega") pedido_status_entrega!: number;
    @field("pedido_data_transmitido") pedido_data_transmitido!: number;
    @field("pedido_selecionado") pedido_selecionado!: boolean;

    @relation(nomeTabela.cliente, "cliente_id") cliente_id!: Relation<ClienteModel>;
    @relation(nomeTabela.mapaDeCarga, "mapa_id") mapa_id!: Relation<MapaDeCargaModel>;
    @relation(nomeTabela.empresa, "empresa_id") empresa_id!: Relation<EmpresaModel>;
}
