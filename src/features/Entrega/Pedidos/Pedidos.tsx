import { FlatList, View } from "react-native";

import styleHome from "../Home/style";
import { CardPedidos } from "./components/CardPedidos/CardPedidos";
import { Header } from "../../../components";
import { usePedidoView } from "./usePedidoView";
export function Pedidos() {
    const { listaPedidos } = usePedidoView();

    function renderItem(item: any) {
        return <CardPedidos item={item} />;
    }
    return (
        <View style={styleHome.container}>
            <Header isGoBack label="Lista de pedidos" />
            <FlatList
                data={listaPedidos}
                keyExtractor={(item) => String(item.codigo)}
                contentContainerStyle={{ padding: 16, gap: 16 }}
                renderItem={({ item }) => renderItem(item)}
            />
        </View>
    );
}
