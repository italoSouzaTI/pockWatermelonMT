import { useRoute } from "@react-navigation/native";
import { useRef, useState } from "react";
import { database } from "../../../core/database";
import { EntregaDoPedidoModel } from "../../../core/database/model";
import { nomeTabela } from "../../../core/database/nomeTabelas";
import { Q } from "@nozbe/watermelondb";

export function useRegistroPedidoView() {
    const { params } = useRoute();
    const [nome, setNome] = useState("");
    const [documento, setDocumento] = useState("");
    const [canhoto, setCanhoto] = useState("");
    const [canhotoObs, setCanhotoObs] = useState("");
    const [boleto, setBoleto] = useState("");
    const [boletoObs, setBoletoObs] = useState("");
    const [anexo, setAnexo] = useState("");
    const [anexoObs, setAnexoObs] = useState("");
    const [abrirCamera, setAbrirCamera] = useState(false);
    const cameraRef = useRef(null);

    async function salvar() {
        try {
            const entregaAtual = await database.write(async () => {
                const reposta = await database
                    .get<EntregaDoPedidoModel>(nomeTabela.entregaDoPedido)
                    .query(Q.where("pedido_venda_codigo", params.pedidoId));
                reposta[0].update((ctx) => {
                    ctx.entrega_do_pedido_data_entrega = new Date().getTime();
                    ctx.entrega_do_pedido_nome_recebedor = nome;
                    ctx.entrega_do_pedido_enviado_comprovante = true;
                    ctx.entrega_do_pedido_comprovante = JSON.stringify([
                        {
                            canhoto: {
                                file: canhoto,
                                descricao: canhotoObs,
                            },
                            boleto: {
                                file: boleto,
                                descricao: boletoObs,
                            },
                            anexo: {
                                file: anexo,
                                descricao: anexoObs,
                            },
                        },
                    ]);
                });
                return reposta;
            });
            console.log(entregaAtual);
        } catch (error) {
            console.log("Error ao salvar");
        }
    }
    function cameraAcao() {
        setAbrirCamera((state) => !state);
    }
    const takePicture = async () => {
        if (cameraRef.current) {
            try {
                const photo = await cameraRef.current.takePictureAsync();
                if (canhoto.length == 0) {
                    setCanhoto(photo.uri);
                } else if (boleto.length == 0) {
                    setBoleto(photo.uri);
                } else if (anexo.length == 0) {
                    setAnexo(photo.uri);
                }
                setAbrirCamera((state) => !state);
            } catch (error) {
                console.error("Erro ao tirar foto:", error);
            }
        }
    };
    return {
        cameraRef,
        nome,
        setNome,
        documento,
        setDocumento,
        canhoto,
        setCanhoto,
        canhotoObs,
        setCanhotoObs,
        boleto,
        setBoleto,
        boletoObs,
        setBoletoObs,
        anexo,
        setAnexo,
        anexoObs,
        setAnexoObs,
        salvar,
        abrirCamera,
        cameraAcao,
        takePicture,
    };
}
