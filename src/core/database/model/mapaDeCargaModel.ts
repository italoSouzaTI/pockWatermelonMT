import { Model } from "@nozbe/watermelondb";
import { children, field, relation } from "@nozbe/watermelondb/decorators";
import { nomeTabela } from "../nomeTabelas";

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

    // Relação inversa para acessar a empresa vinculada
    @relation("clientes", "cliente_id") cliente!: any;
    @relation("empresas", "empresa_id") empresa!: any;

    @children("pedidos") pedidos!: any;
    //   @children('ocorrencias_devolver') ocorrenciasDevolver!:any
    //   @children('ocorrencias') ocorrencias!:any
    //   @children('jornadas_cliente') jornadas!:any
}
