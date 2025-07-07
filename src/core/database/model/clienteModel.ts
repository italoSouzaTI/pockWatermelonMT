import { children, field } from "@nozbe/watermelondb/decorators";
import { nomeTabela } from "../nomeTabelas";
import { Model } from "@nozbe/watermelondb";

export class ClienteModel extends Model {
    static table = nomeTabela.cliente;

    @field("cliente_codigo") cliente_codigo!: number;
    @field("cliente_razao_social") cliente_razao_social!: string;
    @field("cliente_latitude") cliente_latitude!: number;
    @field("cliente_longitude") cliente_longitude!: number;

    @children("mapas_de_carga") mapasDeCarga!: any;
    @children("pedidos") pedidos!: any;
    @children("jornadas_cliente") jornadas!: any;
}
