import { Text, View } from "react-native";

export function Card() {
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
                    <Text style={{ fontSize: 14, fontWeight: "bold" }}>Mapa</Text>
                    <Text style={{ fontSize: 14 }}>12343</Text>
                </View>
                <View>
                    <Text style={{ fontSize: 14, fontWeight: "bold" }}>Empresa</Text>
                    <Text style={{ fontSize: 14 }}>Matriz</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <View style={{ flexDirection: "row", gap: 8 }}>
                        <Text style={{ fontSize: 14, fontWeight: "bold" }}>Atendidos</Text>
                        <Text style={{ fontSize: 14 }}>0</Text>
                    </View>
                    <View style={{ flexDirection: "row", gap: 8 }}>
                        <Text style={{ fontSize: 14, fontWeight: "bold" }}>Total</Text>
                        <Text style={{ fontSize: 14 }}>0</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}
