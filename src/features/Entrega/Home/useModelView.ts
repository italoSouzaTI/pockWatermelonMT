import { useEffect, useState } from "react";
import { buscandoTodasEmpresas } from "./hooks/useBuscarTodasEmpresa";
import { database } from "../../../core/database";
import { nomeTabela } from "../../../core/database/nomeTabelas";
import { BuscandoMapas } from "./hooks/useBuscarMapa";
import { TcardMapa } from "./types/mapa";
import { useCameraPermissions } from "expo-camera";

export function useModelView() {
    const [listaMapas, setListaMapas] = useState<TcardMapa[]>([]);
    const [test, setTeste] = useState(false);
    const [permission, requestPermission] = useCameraPermissions();
    async function permissaoCamera() {
        try {
            console.log(permission);
            if (permission?.granted == false) {
                await requestPermission();
            }
        } catch (error) {}
    }
    async function populandolistaDeMapa() {
        try {
            let novosMapas: TcardMapa[] = [];

            const mapasNoDB = (await database.get(nomeTabela.mapaDeCarga).query().fetch()).map((ctx) => ctx._raw);
            for (const element of mapasNoDB) {
                const empresaAtual = (await database.get(nomeTabela.empresa).find(element.empresa_id))._raw;
                novosMapas.push({
                    mapa_id: element.id,
                    empresa_id: element.empresa_id,
                    mapa: element.mapa_id,
                    empresa: empresaAtual.empresa_fantasia,
                    atendidos: element.mapa_andamento,
                    total: element.mapa_total,
                    cnpj: empresaAtual.empresa_cnpj,
                    clientes: element.mapa_cliente_id,
                });
            }
            setListaMapas(novosMapas);
        } catch (error) {}
    }
    useEffect(() => {
        (async () => {
            const result = await buscandoTodasEmpresas();
            setTeste(result);
        })();
    }, []);
    useEffect(() => {
        permissaoCamera();
        if (test) {
            BuscandoMapas();
            populandolistaDeMapa();
        }
    }, [test]);
    return {
        listaMapas,
    };
}
