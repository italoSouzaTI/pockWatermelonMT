import { useEffect, useState } from "react";
import { TCardPedidos } from "../../types/tPedidos";
import { database } from "../../../../../core/database";
import { nomeTabela } from "../../../../../core/database/nomeTabelas";
import {
    EmpresaModel,
    EntregaDoPedidoModel,
    JornadaDoClienteModel,
    PedidoModel,
} from "../../../../../core/database/model";
import { useRoute } from "@react-navigation/native";

export function useCardPedidos(itemAtual: TCardPedidos) {
    const [isSelected, setIsSelected] = useState(false);
    const { params } = useRoute();

    async function checandoPedido(item: TCardPedidos) {
        try {
            if (item.dataEntrega === -62135589600000) {
                setIsSelected(true);

                const empresaAtual = await database.get<EmpresaModel>(nomeTabela.empresa).find(params.empresaId);
                const pedidoAtual = await database.get<PedidoModel>(nomeTabela.pedido).find(item.pedidoId);

                const dataAtual = new Date().getTime();

                const resultado = await database.write(async () => {
                    const novaEntrega = await database
                        .get<EntregaDoPedidoModel>(nomeTabela.entregaDoPedido)
                        .create((pedido) => {
                            pedido.entrega_do_pedido_data_entrega = dataAtual;
                            pedido.entrega_do_pedido_codigo_usuario = 1;
                            pedido.entrega_do_pedido_nome_celular = "emulador";
                            pedido.entrega_do_pedido_latitude = 0;
                            pedido.entrega_do_pedido_longitude = 0;
                            pedido.entrega_do_pedido_nome_recebedor = "";
                            pedido.entrega_do_pedido_enviado_comprovante = false;
                            pedido.entrega_do_pedido_comprovante = "";

                            // Estabelece os relacionamentos
                            pedido.pedido_venda_codigo.set(pedidoAtual);
                            pedido.pedido_empresa_id.set(empresaAtual);
                        });

                    // Atualiza o pedido
                    await pedidoAtual.update((pedido) => {
                        pedido.pedido_selecionado = true;
                        pedido.pedido_data_entrega = dataAtual;
                    });

                    return novaEntrega;
                });

                console.log("Operação concluída com sucesso:", resultado._raw);
                return resultado;
            }
        } catch (error) {
            console.log("Falha ao processar pedido:", error.message);
            setIsSelected(false); // Reverte estado em caso de erro
            throw error; // Propaga o erro para quem chamou a função
        }
    }
    useEffect(() => {
        if (itemAtual.dataEntrega != -62135589600000) {
            setIsSelected(true);
        }
    }, []);

    return {
        checandoPedido,
        setIsSelected,
        isSelected,
    };
}
