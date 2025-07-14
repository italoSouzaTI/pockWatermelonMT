import { Alert } from "react-native";
import { supabaseService } from "../../api/suparbase.http";
import { Empresa } from "../../../../core/types/empresa";
import { database } from "../../../../core/database";
import { nomeTabela } from "../../../../core/database/nomeTabelas";
import { Q } from "@nozbe/watermelondb";

export async function buscandoTodasEmpresas() {
    try {
        const empresas = await supabaseService.todasEmpresas();
        const resuladoEmpresaDB = await buscandoEmpresasDB();
        if (empresas.length == 0) return;
        if (resuladoEmpresaDB.length == 0) {
            await inserindoDadosNoBanco(empresas);
        } else {
            await compararEmpresas(empresas, resuladoEmpresaDB);
        }
        return true;
    } catch (error) {
        Alert.alert(error);
        return false;
    }
}
async function buscandoEmpresasDB(): Promise<
    [] | Array<Omit<Empresa, "empresa_cnpj" | "empresa_razao_social" | "empresa_fantasia">>
> {
    try {
        let auxEmpresa: Array<Omit<Empresa, "empresa_cnpj" | "empresa_razao_social" | "empresa_fantasia">> = [];
        const empresaDB = await database.get(nomeTabela.empresa).query().fetch();
        if (empresaDB.length == 0) {
            return [];
        }
        empresaDB.forEach((row) => {
            const empresaRow = row as unknown as Empresa;
            auxEmpresa.push({
                empresa_codigo: empresaRow.empresa_codigo,
                empresa_ativa: empresaRow.empresa_ativa,
            });
        });
        return auxEmpresa;
    } catch (error) {
        return [];
    }
}
async function inserindoDadosNoBanco(empresa: Empresa[]) {
    await database.write(async () => {
        for (const row of empresa) {
            const newEmpresa = await database.collections
                .get(`${nomeTabela.empresa}`) // Nome correto da tabela
                .create((emp) => {
                    emp.empresa_codigo = row.empresa_codigo;
                    emp.empresa_cnpj = row.empresa_cnpj;
                    emp.empresa_razao_social = row.empresa_razao_social;
                    emp.empresa_fantasia = row.empresa_fantasia;
                    emp.empresa_ativa = row.empresa_ativa;
                });
        }
    });
}
async function compararEmpresas(
    empresas: Empresa[],
    empresasDB: Array<Omit<Empresa, "empresa_cnpj" | "empresa_razao_social" | "empresa_fantasia">>
) {
    const empresasParaInserir = empresas.filter((empresa) => {
        return !empresasDB.some((dbEmpresa) => dbEmpresa.empresa_codigo === empresa.empresa_codigo);
    });
    if (empresasParaInserir.length > 0) {
        await inserindoDadosNoBanco(empresasParaInserir);
    } else {
        const empresasModificada = empresas.filter((empresa) => {
            return empresasDB.some(
                (dbEmpresa) =>
                    dbEmpresa.empresa_codigo === empresa.empresa_codigo &&
                    dbEmpresa.empresa_ativa !== empresa.empresa_ativa
            );
        });
        atualizandoEmpresa(empresasModificada);
    }
}
async function atualizandoEmpresa(params: Empresa[]) {
    await database.write(async () => {
        for (const row of params) {
            const empresaAtual = await database
                .get(nomeTabela.empresa)
                .query(Q.where("empresa_codigo", row.empresa_codigo))
                .fetch();
            const empresa = await database.get(nomeTabela.empresa).find(empresaAtual[0].id);
            await empresa.update((empresa) => {
                empresa.empresa_ativa = row.empresa_ativa;
            });
        }
    });
}
