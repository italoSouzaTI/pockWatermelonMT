import { Model, Relation } from "@nozbe/watermelondb";
import { children, field, relation, json } from "@nozbe/watermelondb/decorators";
import { nomeTabela } from "../nomeTabelas";
import { EmpresaModel } from "./empresaModel";
import { PedidoModel } from "./pedidoModel";
const sanitizeReactions = (json) => json;
export class MapaDeCargaModel extends Model {
    static table = nomeTabela.mapaDeCarga;

    static associations = {
        [nomeTabela.cliente]: { type: "belongs_to", foreignKey: "cliente_id" },
        [nomeTabela.empresa]: { type: "belongs_to", foreignKey: "empresa_id" },
    };

    @field("mapa_id") mapa_id!: number;
    @field("mapa_data_emissao") mapa_data_emissao!: number;
    @field("mapa_envio_pesquisa") mapa_envio_pesquisa!: boolean;
    @field("mapa_total") mapa_total!: number;
    @field("mapa_andamento") mapa_andamento!: number;
    @field("mapa_sete_dias") mapa_sete_dias!: number;
    @json("mapa_cliente_id", sanitizeReactions) mapa_cliente_id!: any;

    // Relação inversa para acessar a empresa vinculada
    @relation(nomeTabela.empresa, "empresa_id") empresa_id!: Relation<EmpresaModel>;

    @children(nomeTabela.pedido) pedidos!: Relation<PedidoModel>;
}
