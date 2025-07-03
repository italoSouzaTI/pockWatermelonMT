import { supabase } from "../../../core/supabase/supabase";
import { Empresa } from "../../../core/types/empresa";
async function todasEmpresas(): Promise<Empresa[]> {
    try {
        const empresas = await supabase.from("empresa").select("*");
        if (!empresas.data) {
            throw new Error("Nenhuma empresa encontrada");
        }
        return empresas.data.map((row) => ({
            empresa_codigo: row.empresa_codigo,
            empresa_cnpj: row.empresa_cnpj,
            empresa_razao_social: row.empresa_razao_social,
            empresa_fantasia: row.empresa_fantasia,
            empresa_ativa: row.empresa_ativa,
        }));
    } catch (error) {
        throw new Error("Erro ao buscar empresas: " + error.message);
    }
}
export const supabaseService = { todasEmpresas };
