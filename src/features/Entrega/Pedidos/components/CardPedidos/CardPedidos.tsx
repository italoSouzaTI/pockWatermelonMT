import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
interface ICardPedidos {
    item: any;
}
export function CardPedidos({ item }: ICardPedidos) {
    const [isSelected, setIsSelected] = useState(false);
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
                    <TouchableOpacity onPress={() => setIsSelected(!isSelected)}>
                        <MaterialIcons name="check-box" size={32} color="green" />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={() => setIsSelected(!isSelected)}>
                        <MaterialIcons name="check-box-outline-blank" size={32} color="gray" />
                    </TouchableOpacity>
                )}
                <TouchableOpacity
                    style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}
                    onPress={() => {
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
