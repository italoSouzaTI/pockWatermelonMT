import { Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";
import { nomeTabela } from "../nomeTabelas";

export class EmpresaModel extends Model {
    static table = nomeTabela.empresa;

    @field("empresa_id") empresa_id!: string;
    @field("empresa_codigo") empresa_codigo!: number;
    @field("empresa_cnpj") empresa_cnpj!: string;
    @field("empresa_razao_social") empresa_razao_social!: string;
    @field("empresa_fantasia") empresa_fantasia!: string;
    @field("empresa_ativa") empresa_ativa!: boolean;
}
