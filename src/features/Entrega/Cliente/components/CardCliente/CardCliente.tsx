import { useNavigation, useRoute } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { TCardCliente } from "../../type/TCardCliente";
interface CardClienteProps {
    item: TCardCliente;
    onPressJornada: (pedido: TCardCliente, mapaId: string, empresaId: string) => void;
}
export function CardCliente({ item, onPressJornada }: CardClienteProps) {
    console.log("item", item);
    const { params } = useRoute();
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
                    <Text style={{ fontSize: 14 }}>{item.codigo}</Text>
                </View>
                <View>
                    <Text style={{ fontSize: 14, fontWeight: "bold" }}>{item.razaoSocial}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <View style={{ flexDirection: "row", gap: 8 }}>
                        <Text style={{ fontSize: 14, fontWeight: "bold" }}>Entregue</Text>
                        <Text style={{ fontSize: 14 }}>{item.entregue}</Text>
                        <Text style={{ fontSize: 14, fontWeight: "bold" }}>de</Text>
                        <Text style={{ fontSize: 14 }}>{item.total}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <TouchableOpacity
                        onPress={() => {
                            navigate("Pedidos", {
                                cliente: item.cliente_id,
                                mapaId: params.mapaId,
                                empresaId: params.empresaId,
                            });
                        }}
                        style={{ padding: 8, backgroundColor: "#e0e0e0", borderRadius: 4 }}
                    >
                        <Text>Pedidos</Text>
                    </TouchableOpacity>
                    {item.latitude != 0 && item.longitude != 0 && (
                        <TouchableOpacity style={{ padding: 8, backgroundColor: "#e0e0e0", borderRadius: 4 }}>
                            <FontAwesome6 name="map-location-dot" size={18} color="red" />
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity
                        style={{ padding: 8, backgroundColor: "#e0e0e0", borderRadius: 4 }}
                        onPress={() => onPressJornada(item, params?.mapaId, params?.empresaId)}
                    >
                        <Text>{item.emAndamento ? "Finalizar entrega" : "Iniciar entrega"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
