import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
interface CardClienteProps {
    item?: any;
}

export function CardCliente({ item }: CardClienteProps) {
    const { navigate } = useNavigation();
    return (
        <View>
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
                    <Text style={{ fontSize: 14 }}>12343</Text>
                </View>
                <View>
                    <Text style={{ fontSize: 14, fontWeight: "bold" }}>Nome cliente</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <View style={{ flexDirection: "row", gap: 8 }}>
                        <Text style={{ fontSize: 14, fontWeight: "bold" }}>Entregue</Text>
                        <Text style={{ fontSize: 14 }}>0</Text>
                        <Text style={{ fontSize: 14, fontWeight: "bold" }}>de</Text>
                        <Text style={{ fontSize: 14 }}>0</Text>
                    </View>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <TouchableOpacity
                        onPress={() => {
                            navigate("Pedidos");
                        }}
                        style={{ padding: 8, backgroundColor: "#e0e0e0", borderRadius: 4 }}
                    >
                        <Text>Pedidos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ padding: 8, backgroundColor: "#e0e0e0", borderRadius: 4 }}>
                        <Text>Iniciar entrega</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
