import { FlatList, Text, View } from "react-native";
import styleHome from "./style";
import { Card } from "./components/Card/Card";
import { Header } from "../../../components";
import { useModelView } from "./useModelView";
import { TcardMapa } from "./types/mapa";

export function Home({ navigation }) {
    const { listaMapas } = useModelView();
    function renderItem(item: TcardMapa) {
        return (
            <Card
                item={item}
                onPress={() => {
                    navigation.navigate("Cliente", {
                        clientes: item.clientes,
                        mapaId: item.mapa_id,
                        empresaId: item.empresa_id,
                    });
                }}
            />
        );
    }
    return (
        <View style={styleHome.container}>
            <Header label="Mapas" />
            <FlatList
                data={listaMapas}
                keyExtractor={(item) => String(item.mapa)}
                contentContainerStyle={{ padding: 16, gap: 16, flexGrow: 1 }}
                renderItem={({ item }) => renderItem(item)}
                ListEmptyComponent={() => (
                    <View style={{ flex: 1, alignItems: "center", paddingTop: 20 }}>
                        <Text style={{ color: "gray", fontWeight: "700", fontSize: 16 }}>
                            Nenhum mapa encontrado até o momento.
                        </Text>
                    </View>
                )}
            />
        </View>
    );
}
