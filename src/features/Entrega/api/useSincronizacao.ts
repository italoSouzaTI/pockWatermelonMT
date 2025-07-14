import { synchronize } from "@nozbe/watermelondb/sync";
import { database } from "../../../core/database";
import { nomeTabela } from "../../../core/database/nomeTabelas";
import { JornadaDoClienteModel } from "../../../core/database/model";
import { supabase } from "../../../core/supabase/supabase";

export function useSincronizacao() {
    const syncAll = async () => {
        await jornadaCliente();
    };

    const jornadaCliente = () => syncTipo(nomeTabela.jornadaDoCliente);

    const syncTipo = async (tipo: keyof typeof nomeTabela) => {
        try {
            const allRecords = await database.get(tipo).query().fetch();
            // 2. Atualizar o status para "created" em todos os registros
            await database.write(async () => {
                for (const record of allRecords) {
                    await record.update((rec) => {
                        // Acessa o objeto _raw diretamente
                        rec._raw._status = "created";
                    });
                }
            });
            console.log("allRecords", allRecords);
            // Primeiro: Buscar todos os registros não sincronizados manualmente
            const items = tipo;
            switch (tipo) {
                case nomeTabela.jornadaDoCliente:
                    const registrosModificados: JornadaDoClienteModel[] = await enviandoJornadaCliente(allRecords);
                    break;

                default:
                    break;
            }
            // await synchronize({
            //     database,
            //     pullChanges: async ({ lastPulledAt }) => {
            //         console.log("Buscando mudanças desde:", lastPulledAt);
            //         return {
            //             changes: {},
            //             timestamp: 1, // Timestamp em segundos
            //         };
            //     },
            //     pushChanges: async ({ changes }) => {
            //         console.log("Mudanças a serem enviadas:", changes);
            //         const items = changes[tipo];
            //         switch (tipo) {
            //             case nomeTabela.jornadaDoCliente:
            //                 const registrosModificados: JornadaDoClienteModel[] = await enviandoJornadaCliente(items);
            //                 console.log("registrosModificados", registrosModificados);
            //                 if (registrosModificados.length > 0) {
            //                     await database.write(async () => {
            //                         for (const record of registrosModificados) {
            //                             console.log(record);
            //                             const jornadaAtual = await database.get(tipo).find(record.id);
            //                             await jornadaAtual.update((rec) => {
            //                                 // Mantém o status como "created" ou "updated"
            //                                 rec._raw._status = "created"; // Força manter o status atual
            //                             });
            //                         }
            //                     });
            //                 }
            //                 break;

            //             default:
            //                 break;
            //         }
            //     },
            //     // Configurações para forçar o push
            //     _unsafeBatchPerCollection: true,
            //     unsafeTurbo: false,
            // });
        } catch (error) {
            console.log(error.message);
        } finally {
        }
    };
    async function enviandoJornadaCliente(jornadas: JornadaDoClienteModel) {
        try {
            let aux = [];
            for (const element of jornadas) {
                if (element._raw.jornada_do_cliente_is_iniciado == false && element._raw._status == "created") {
                    console.log(element);
                    aux.push({
                        jornada_do_cliente_data_inicio: new Date(element._raw.jornada_do_cliente_data_inicio),
                        jornada_do_cliente_data_fim: new Date(element._raw.jornada_do_cliente_data_fim),
                        jornada_do_cliente_latitude_inicio: element._raw.jornada_do_cliente_latitude_inicio,
                        jornada_do_cliente_longitude_inicio: element._raw.jornada_do_cliente_longitude_inicio,
                        jornada_do_cliente_latitude_fim: element._raw.jornada_do_cliente_latitude_fim,
                        jornada_do_cliente_longitude_fim: element._raw.jornada_do_cliente_longitude_fim,
                        cliente_id: element._raw.cliente_id,
                        mapa_de_carga_id: element._raw.mapa_de_carga_id,
                        empresa_id: element._raw.empresa_id,
                    });
                    await database.write(async () => {
                        element._raw._status = "synced";
                    });
                }
            }
            const { data, error } = await supabase.from(nomeTabela.jornadaDoCliente).insert(aux).select();
            if (error) {
                throw error;
            }
            console.log(data);
            // return registrosParaManter;
        } catch (error) {
            console.log("inserindo na tabela suparbase", error.message);
        }
    }

    return {
        syncAll,
    };
}
