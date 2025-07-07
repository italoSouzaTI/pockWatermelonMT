import { Model } from "@nozbe/watermelondb";
import { children, field, relation, json } from "@nozbe/watermelondb/decorators";
import { nomeTabela } from "../nomeTabelas";
const sanitizeReactions = (json) => json;
export class MapaDeCargaModel extends Model {
    static table = nomeTabela.mapaDeCarga;

    static associations = {
        clientes: { type: "belongs_to", key: "cliente_id" },
        empresas: { type: "belongs_to", key: "empresa_id" },
    };

    @field("mapa_id") mapa_id!: number;
    @field("mapa_data_emissao") mapa_data_emissao!: number;
    @field("mapa_envio_pesquisa") mapa_envio_pesquisa!: boolean;
    @field("mapa_total") mapa_total!: number;
    @field("mapa_andamento") mapa_andamento!: number;
    @field("mapa_sete_dias") mapa_sete_dias!: number;
    @json("mapa_cliente_id", sanitizeReactions) mapa_cliente_id!: any;

    // Relação inversa para acessar a empresa vinculada
    @relation("empresas", "empresa_id") empresa!: any;

    @children("pedidos") pedidos!: any;
}
