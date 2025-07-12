import * as Location from "expo-location";
import { useState } from "react";
import { database } from "../../../../core/database";
import { nomeTabela } from "../../../../core/database/nomeTabelas";
import { TCardCliente } from "../type/TCardCliente";
import { ClienteModel, EmpresaModel, JornadaDoClienteModel, MapaDeCargaModel } from "../../../../core/database/model";
import { map } from "@nozbe/watermelondb/utils/rx";
import { Q } from "@nozbe/watermelondb";
export function useJornadaCliente() {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    async function getLocation() {
        try {
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        } catch (error) {}
    }
    async function inserirJornada(pedido: TCardCliente, mapaId: string, empresaId: string) {
        try {
            if (location == null) {
                await getLocation();
                await inserirJornada(pedido, mapaId, empresaId);
                return;
            }
            const registros = await database.get(nomeTabela.jornadaDoCliente).query().fetch();
            console.log("registros", registros);
            if (registros.length == 0) {
                await iniciarJornada(pedido, mapaId, empresaId);
                return;
            }
            const registroAtivo = await database
                .get(nomeTabela.jornadaDoCliente)
                .query(Q.where("cliente_id", pedido.cliente_id), Q.where("jornada_do_cliente_is_iniciado", true))
                .fetch();
            if (registroAtivo.length) {
                const customId = registroAtivo.map((ctx) => ctx._raw.id);
                await finalizarJornada(customId[0]);
            } else {
                await iniciarJornada(pedido, mapaId, empresaId);
                return;
            }
        } catch (error) {
            console.log("error inserirJornada", error.message);
        }
    }
    async function iniciarJornada(pedido: TCardCliente, mapaId: string, empresaId: string) {
        try {
            const mapa = await database.get<MapaDeCargaModel>(nomeTabela.mapaDeCarga).find(mapaId);
            const empresa = await database.get<EmpresaModel>(nomeTabela.empresa).find(empresaId);
            const cliente = await database.get<ClienteModel>(nomeTabela.cliente).find(pedido.cliente_id);
            let novoRegistro = await database.write(async () => {
                try {
                    return database.get<JornadaDoClienteModel>(nomeTabela.jornadaDoCliente).create((registro) => {
                        registro.jornada_do_cliente_data_inicio = new Date().getTime();
                        registro.jornada_do_cliente_data_fim = 0;
                        registro.jornada_do_cliente_is_iniciado = true;
                        registro.jornada_do_cliente_is_sincronizado = false;
                        registro.jornada_do_cliente_latitude_inicio = location.coords.latitude;
                        registro.jornada_do_cliente_longitude_inicio = location.coords.longitude;
                        registro.jornada_do_cliente_latitude_fim = 0;
                        registro.jornada_do_cliente_longitude_fim = 0;
                        registro.mapaDeCarga.set(mapa);
                        registro.empresa.set(empresa);
                        registro.cliente.set(cliente);
                    });
                } catch (error) {
                    console.log("iniciarJornada interno com error", error.message);
                }
            });
            console.log("novoRegistro", novoRegistro);
        } catch (error) {
            console.log("iniciarJornada geral com error", error.message);
        }
    }

    async function finalizarJornada(idRegistro: string) {
        console.log("idRegistro", idRegistro);

        try {
            const finalizandoRegistro = await database.write(async () => {
                try {
                    const registro = await database
                        .get<JornadaDoClienteModel>(nomeTabela.jornadaDoCliente)
                        .find(idRegistro);

                    return await registro.update((ctx) => {
                        ctx.jornada_do_cliente_data_fim = new Date().getTime();
                        ctx.jornada_do_cliente_is_iniciado = false;
                        ctx.jornada_do_cliente_latitude_fim = location?.coords?.latitude || 0;
                        ctx.jornada_do_cliente_longitude_fim = location?.coords?.longitude || 0;
                    });
                } catch (error) {
                    console.log("Erro ao finalizar jornada:", error.message);
                    throw error; // Propaga o erro para o catch externo
                }
            });

            console.log("Registro finalizado:", finalizandoRegistro);
        } catch (error) {
            console.log("Erro geral ao finalizar jornada:", error.message);
            throw error; // Opcional: propague o erro para quem chamou a função
        }
    }
    return {
        inserirJornada,
    };
}
