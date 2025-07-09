import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { database } from "../../../core/database";
import { nomeTabela } from "../../../core/database/nomeTabelas";
import { Q } from "@nozbe/watermelondb";

export function useClienteView() {
    const { params } = useRoute();
    const [listaCliente, setListaCliente] = useState([]);
    async function carregandoListaDeClientes() {
        try {
            const clientes = JSON.parse(params.clientes);

            const listaDeCliente = [];

            for (const cliente of clientes) {
                try {
                    const pedidos = await database.collections
                        .get(nomeTabela.pedido)
                        .query(
                            Q.and(
                                Q.where("cliente_id", cliente),
                                Q.where("mapa_id", params.mapaId),
                                Q.where("empresa_id", params.empresaId)
                            )
                        )
                        .fetch();

                    const clienteAtual = (await database.get(nomeTabela.cliente).find(cliente))._raw;
                    const entregueAtual = pedidos.filter((item) => item.pedido_selecionado).length;
                    listaDeCliente.push({
                        codigo: clienteAtual.cliente_codigo,
                        razaoSocial: clienteAtual.cliente_razao_social,
                        latitude: clienteAtual.cliente_latitude,
                        longitude: clienteAtual.cliente_longitude,
                        cliente_id: cliente,
                        entregue: entregueAtual,
                        total: pedidos.length,
                    });
                } catch (error) {
                    console.error(`Erro ao buscar pedidos para cliente ${cliente.id}:`, error);
                }
            }
            setListaCliente(listaDeCliente);
        } catch (error) {
            console.error("Erro geral em busca clientes:", error);
            return [];
        }
    }
    useEffect(() => {
        if (params?.hasOwnProperty("clientes")) {
            carregandoListaDeClientes();
        }
    }, [params]);
    return { listaCliente };
}
