import { field, relation } from "@nozbe/watermelondb/decorators";
import { nomeTabela } from "../nomeTabelas";
import { Model, Relation } from "@nozbe/watermelondb";
import { MapaDeCargaModel } from "./mapaDeCargaModel";
import { EmpresaModel } from "./empresaModel";
import { ClienteModel } from "./clienteModel";

export class JornadaDoClienteModel extends Model {
    static table = nomeTabela.jornadaDoCliente;
    static associations = {
        [nomeTabela.cliente]: { type: "belongs_to", foreignKey: "cliente_id" },
        [nomeTabela.mapaDeCarga]: { type: "belongs_to", foreignKey: "mapa_de_carga_id" },
        [nomeTabela.empresa]: { type: "belongs_to", foreignKey: "empresa_id" },
    };

    @field("jornada_do_cliente_data_inicio") jornada_do_cliente_data_inicio!: number;
    @field("jornada_do_cliente_data_fim") jornada_do_cliente_data_fim!: number;
    @field("jornada_do_cliente_is_iniciado") jornada_do_cliente_is_iniciado!: boolean;
    @field("jornada_do_cliente_is_sincronizado") jornada_do_cliente_is_sincronizado!: boolean;
    @field("jornada_do_cliente_latitude_inicio") jornada_do_cliente_latitude_inicio!: number;
    @field("jornada_do_cliente_longitude_inicio") jornada_do_cliente_longitude_inicio!: number;
    @field("jornada_do_cliente_latitude_fim") jornada_do_cliente_latitude_fim!: number;
    @field("jornada_do_cliente_longitude_fim") jornada_do_cliente_longitude_fim!: number;

    @relation(nomeTabela.mapaDeCarga, "mapa_de_carga_id") mapaDeCarga!: Relation<MapaDeCargaModel>;
    @relation(nomeTabela.pedido, "empresa_id") empresa!: Relation<EmpresaModel>;
    @relation(nomeTabela.cliente, "cliente_id") cliente!: Relation<ClienteModel>;
}
