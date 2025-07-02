import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
export function CardPedidos() {
    const [isSelected, setIsSelected] = useState(false);
    return (
        <TouchableOpacity
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
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                {isSelected ? (
                    <MaterialIcons name="check-box" size={32} color="green" />
                ) : (
                    <MaterialIcons name="check-box-outline-blank" size={32} color="gray" />
                )}

                <View style={{ gap: 8 }}>
                    <Text style={{ fontSize: 14, fontWeight: "bold" }}>Pedidos</Text>
                    <Text style={{ fontSize: 14 }}>0</Text>
                </View>
                <View style={{ gap: 8 }}>
                    <Text style={{ fontSize: 14, fontWeight: "bold" }}>Nota</Text>
                    <Text style={{ fontSize: 14 }}>0</Text>
                </View>
                <View style={{ gap: 8 }}>
                    <Text style={{ fontSize: 14, fontWeight: "bold" }}>Total de Itens</Text>
                    <Text style={{ fontSize: 14 }}>0</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}
