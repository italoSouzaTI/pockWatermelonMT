import { useEffect } from "react";
import { buscandoTodasEmpresas } from "./hooks/useBuscarTodasEmpresa";
export function useModelView() {
    useEffect(() => {
        buscandoTodasEmpresas();
    }, []);
    return {};
}
