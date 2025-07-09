import { children, field } from "@nozbe/watermelondb/decorators";
import { nomeTabela } from "../nomeTabelas";
import { Model, Relation } from "@nozbe/watermelondb";
import { MapaDeCargaModel } from "./mapaDeCargaModel";
import { PedidoModel } from "./pedidoModel";
import { EmpresaModel } from "./empresaModel";
import { ClienteModel } from "./clienteModel";

export class JornadaDoClienteModel extends Model {
    static table = nomeTabela.jornadaDoCliente;

    @field("jornada_do_cliente_data_inicio") jornada_do_cliente_data_inicio!: number;
    @field("jornada_do_cliente_data_fim") jornada_do_cliente_data_fim!: number;
    @field("jornada_do_cliente_is_iniciado") jornada_do_cliente_is_iniciado!: boolean;
    @field("jornada_do_cliente_is_sincronizado") jornada_do_cliente_is_sincronizado!: boolean;
    @field("jornada_do_cliente_latitude_inicio") jornada_do_cliente_latitude_inicio!: number;
    @field("jornada_do_cliente_longitude_inicio") jornada_do_cliente_longitude_inicio!: number;
    @field("jornada_do_cliente_latitude_fim") jornada_do_cliente_latitude_fim!: number;
    @field("jornada_do_cliente_longitude_fim") jornada_do_cliente_longitude_fim!: number;

    @children(nomeTabela.mapaDeCarga) mapa_de_carga_id!: Relation<MapaDeCargaModel>;
    @children(nomeTabela.pedido) empresa_id!: Relation<EmpresaModel>;
    @children(nomeTabela.cliente) cliente_id!: Relation<ClienteModel>;
}
