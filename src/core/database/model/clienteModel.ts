import { children, field } from "@nozbe/watermelondb/decorators";
import { nomeTabela } from "../nomeTabelas";
import { Model, Relation } from "@nozbe/watermelondb";
import { MapaDeCargaModel } from "./mapaDeCargaModel";
import { PedidoModel } from "./pedidoModel";

export class ClienteModel extends Model {
    static table = nomeTabela.cliente;

    @field("cliente_codigo") cliente_codigo!: number;
    @field("cliente_razao_social") cliente_razao_social!: string;
    @field("cliente_latitude") cliente_latitude!: number;
    @field("cliente_longitude") cliente_longitude!: number;

    @children(nomeTabela.mapaDeCarga) mapasDeCarga!: Relation<MapaDeCargaModel>;
    @children(nomeTabela.pedido) pedidos!: Relation<PedidoModel>;
    // @children("jornadas_cliente") jornadas!: Relation<MapaDeCargaModel>;
}
