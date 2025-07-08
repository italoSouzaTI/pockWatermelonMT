import { useEffect, useState } from "react";
import { nomeTabela } from "../../../core/database/nomeTabelas";
import { useRoute } from "@react-navigation/native";
import { database } from "../../../core/database";
import { Q } from "@nozbe/watermelondb";

export function usePedidoView() {
    const { params } = useRoute();
    console.log("params", params);
    const [listaPedidos, setListaPedidos] = useState([]);
    async function carregandoListaDePedidos() {
        try {
            const listaDePedidos = [];
            const pedidos = await database.collections
                .get(nomeTabela.pedido)
                .query(
                    Q.and(
                        Q.where("cliente_id", params.cliente),
                        Q.where("mapa_id", params.mapaId),
                        Q.where("empresa_id", params.empresaId)
                    )
                )
                .fetch();
            console.log(pedidos);
            for (const element of pedidos) {
                listaDePedidos.push({
                    codigo: element.pedido_venda_codigo,
                    numeronNF: element.pedido_numero_nf,
                    quantidadeItens: element.pedido_quantidade_itens,
                    dataEntrega: element.pedido_data_entrega,
                    envioComprovante: element.pedido_enviado_comprovante,
                });
            }

            setListaPedidos(listaDePedidos);
        } catch (error) {
            console.error("Erro geral em busca clientes:", error);
            return [];
        }
    }
    useEffect(() => {
        carregandoListaDePedidos();
    }, []);
    return {
        listaPedidos,
    };
}
