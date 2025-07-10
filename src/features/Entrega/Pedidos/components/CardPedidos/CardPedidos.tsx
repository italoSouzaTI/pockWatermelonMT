import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { useCardPedidos } from "./useCardPedidos";
import { TCardPedidos } from "../../types/tPedidos";
export interface ICardPedidos {
    item: TCardPedidos;
}
export function CardPedidos({ item }: ICardPedidos) {
    const { checandoPedido, isSelected } = useCardPedidos(item);
    const { navigate } = useNavigation();
    return (
        <View
            style={{
                width: "100%",
                padding: 8,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "#ccc",
                backgroundColor: "#f9f9f9",
                gap: 8,
            }}
        >
            <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 16, alignItems: "center" }}>
                {isSelected ? (
                    <TouchableOpacity disabled>
                        <MaterialIcons name="check-box" size={32} color="green" />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={() => checandoPedido(item)}>
                        <MaterialIcons name="check-box-outline-blank" size={32} color="gray" />
                    </TouchableOpacity>
                )}
                <TouchableOpacity
                    style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}
                    onPress={() => {
                        if (item.dataEntrega == -62135589600000) {
                            return Alert.alert(
                                "Atenção",
                                "Precisa selecionar pedido para poder preencher os dados do pedido."
                            );
                        }
                        navigate("RegistroPedido");
                    }}
                >
                    <View style={{ gap: 8 }}>
                        <Text style={{ fontSize: 14, fontWeight: "bold" }}>Pedidos</Text>
                        <Text style={{ fontSize: 14 }}>{item.codigo}</Text>
                    </View>
                    <View style={{ gap: 8 }}>
                        <Text style={{ fontSize: 14, fontWeight: "bold" }}>Nota</Text>
                        <Text style={{ fontSize: 14 }}>{item.numeronNF}</Text>
                    </View>
                    <View style={{ gap: 8 }}>
                        <Text style={{ fontSize: 14, fontWeight: "bold" }}>Total de Itens</Text>
                        <Text style={{ fontSize: 14 }}>{item.quantidadeItens}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}
