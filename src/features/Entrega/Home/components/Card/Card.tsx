import { Text, TouchableOpacity, View } from "react-native";
import { TcardMapa } from "../../types/mapa";

interface CardProps {
    item: TcardMapa;
    onPress?: () => void;
}
export function Card({ item, onPress }: CardProps) {
    return (
        <TouchableOpacity onPress={onPress}>
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
                <View>
                    <Text style={{ fontSize: 14, fontWeight: "bold" }}>Mapa</Text>
                    <Text style={{ fontSize: 14 }}>{item.mapa}</Text>
                </View>
                <View>
                    <Text style={{ fontSize: 14, fontWeight: "bold" }}>Empresa</Text>
                    <Text style={{ fontSize: 14 }}>{item.empresa}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <View style={{ flexDirection: "row", gap: 8 }}>
                        <Text style={{ fontSize: 14, fontWeight: "bold" }}>Atendidos</Text>
                        <Text style={{ fontSize: 14 }}>{item.atendidos}</Text>
                    </View>
                    <View style={{ flexDirection: "row", gap: 8 }}>
                        <Text style={{ fontSize: 14, fontWeight: "bold" }}>Total</Text>
                        <Text style={{ fontSize: 14 }}>{item.total}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}
