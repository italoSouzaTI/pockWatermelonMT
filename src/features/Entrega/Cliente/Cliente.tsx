import { FlatList, RefreshControl, Text, View } from "react-native";
import { CardCliente } from "./components/CardCliente/CardCliente";
import styleHome from "../Home/style";
import { Header } from "../../../components";
import { useClienteView } from "./useClienteView";

export function Cliente() {
    const { listaCliente, inserirJornada, carregandoListaDeClientes, loading } = useClienteView();

    function renderItem(item: any) {
        return <CardCliente item={item} onPressJornada={inserirJornada} />;
    }
    return (
        <View style={styleHome.container}>
            <Header isGoBack label="Lista de clientes" />
            <FlatList
                data={listaCliente}
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={carregandoListaDeClientes}
                        colors={["#1a73e8"]} // Cor do spinner (opcional)
                        tintColor="#1a73e8" // Cor do spinner (iOS)
                        title="Atualizando..." // Texto (iOS)
                        titleColor="#1a73e8" // Cor do texto (iOS)
                    />
                }
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
