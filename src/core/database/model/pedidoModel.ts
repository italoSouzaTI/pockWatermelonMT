import { Model } from "@nozbe/watermelondb";
import { nomeTabela } from "../nomeTabelas";
import { children, field, relation } from "@nozbe/watermelondb/decorators";

export class PedidoModel extends Model {
    static table = nomeTabela.pedido;
    static associations = {
        clientes: { type: "belongs_to", key: "cliente_id" },
        mapas_de_carga: { type: "belongs_to", key: "mapa_id" },
        empresas: { type: "belongs_to", key: "empresa_id" },
    };

    @field("pedido_venda_codigo") pedido_vendaCodigo!: number;
    @field("pedido_numero_nf") pedido_numeroNf!: string;
    @field("pedido_quantidade_itens") pedido_quantidadeItens!: number;
    @field("pedido_data_entrega") pedido_dataEntrega!: number;
    @field("pedido_enviado_comprovante") pedido_enviadoComprovante!: boolean;
    @field("pedido_status") pedido_status!: number;
    @field("pedido_status_entrega") pedido_statusEntrega!: number;
    @field("pedido_data_transmitido") pedido_dataTransmitido!: number;
    @field("pedido_selecionado") pedido_selecionado!: boolean;

    @relation("clientes", "cliente_id") cliente!: any;
    @relation("mapas_de_carga", "mapa_id") mapaDeCarga!: any;
    @relation("empresas", "empresa_id") empresa!: any;

    //   @children('itens_pedido') itens!:any
    //   @children('entregas_pedido') entregas!:any
}
