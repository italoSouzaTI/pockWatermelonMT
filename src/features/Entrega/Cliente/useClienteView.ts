import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { database } from "../../../core/database";
import { nomeTabela } from "../../../core/database/nomeTabelas";
import { Q } from "@nozbe/watermelondb";
import * as Location from "expo-location";
import { Alert } from "react-native";
import { useJornadaCliente } from "./hooks/useJornada";
import { TCardCliente } from "./type/TCardCliente";
export function useClienteView() {
    const { params } = useRoute();
    const [listaCliente, setListaCliente] = useState<TCardCliente[]>([]);
    const [loading, setLoading] = useState(true);
    const { inserirJornada } = useJornadaCliente();
    async function carregandoListaDeClientes() {
        try {
            setLoading(true);
            const clientes = JSON.parse(params.clientes);

            const listaDeCliente = [] as TCardCliente[];

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
                    const aux = await database.get(nomeTabela.jornadaDoCliente).query().fetch();
                    console.log("aux", aux);
                    console.log("clienteAtual", clienteAtual);
                    const registroAtivo = await database
                        .get(nomeTabela.jornadaDoCliente)
                        .query(Q.where("cliente_id", clienteAtual.id), Q.where("jornada_do_cliente_is_iniciado", true))
                        .fetch();
                    console.log("registroAtivo", registroAtivo);
                    listaDeCliente.push({
                        codigo: clienteAtual.cliente_codigo,
                        razaoSocial: clienteAtual.cliente_razao_social,
                        latitude: clienteAtual.cliente_latitude,
                        longitude: clienteAtual.cliente_longitude,
                        cliente_id: cliente,
                        entregue: entregueAtual,
                        total: pedidos.length,
                        emAndamento: registroAtivo.length > 0 ? true : false,
                    });
                } catch (error) {
                    console.error(`Erro ao buscar pedidos para cliente ${cliente.id}:`, error);
                }
            }
            setListaCliente(listaDeCliente);
        } catch (error) {
            console.error("Erro geral em busca clientes:", error);
            return [];
        } finally {
            setLoading(false);
        }
    }
    async function getCurrentLocation() {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("Permission to access location was denied");
            return;
        }
    }

    useEffect(() => {
        carregandoListaDeClientes();
    }, []);

    useEffect(() => {
        getCurrentLocation();
    }, []);

    return { listaCliente, inserirJornada, carregandoListaDeClientes, loading };
}
