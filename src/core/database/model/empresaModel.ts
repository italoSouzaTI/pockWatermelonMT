import { Model, Relation } from "@nozbe/watermelondb";
import { children, field } from "@nozbe/watermelondb/decorators";
import { nomeTabela } from "../nomeTabelas";
import { MapaDeCargaModel } from "./mapaDeCargaModel";
import { PedidoModel } from "./pedidoModel";

export class EmpresaModel extends Model {
    static table = nomeTabela.empresa;
    @field("empresa_codigo") empresa_codigo!: number;
    @field("empresa_cnpj") empresa_cnpj!: string;
    @field("empresa_razao_social") empresa_razao_social!: string;
    @field("empresa_fantasia") empresa_fantasia!: string;
    @field("empresa_ativa") empresa_ativa!: boolean;

    @children(nomeTabela.mapaDeCarga) mapasDeCarga!: Relation<MapaDeCargaModel>;
    @children(nomeTabela.pedido) pedidos!: Relation<PedidoModel>;
}
