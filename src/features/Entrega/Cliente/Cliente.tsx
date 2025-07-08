import { FlatList, Text, View } from "react-native";
import { CardCliente } from "./components/CardCliente/CardCliente";
import styleHome from "../Home/style";
import { Header } from "../../../components";
import { useClienteView } from "./useClienteView";

export function Cliente() {
    const { listaCliente } = useClienteView();

    function renderItem(item: any) {
        return <CardCliente item={item} />;
    }
    return (
        <View style={styleHome.container}>
            <Header isGoBack label="Lista de clientes" />
            <FlatList
                data={listaCliente}
                keyExtractor={(item) => String(item.cliente_id)}
                contentContainerStyle={{ padding: 16, gap: 16 }}
                renderItem={({ item }) => renderItem(item)}
                ListEmptyComponent={() => (
                    <View style={{ flex: 1, alignItems: "center", paddingTop: 20 }}>
                        <Text style={{ color: "gray", fontWeight: "700", fontSize: 16 }}>
                            Nenhum cliente encontrado até o momento.
                        </Text>
                    </View>
                )}
            />
        </View>
    );
}
