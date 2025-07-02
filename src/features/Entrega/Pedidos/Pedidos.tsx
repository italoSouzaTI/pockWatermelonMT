import { FlatList, View } from "react-native";

import styleHome from "../Home/style";
import { CardPedidos } from "./components/CardPedidos/CardPedidos";
export function Pedidos() {
    function renderItem(item: any) {
        return <CardPedidos item={item} />;
    }
    return (
        <View style={styleHome.container}>
            <FlatList
                data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                contentContainerStyle={{ padding: 16, gap: 16 }}
                renderItem={({ item }) => renderItem(item)}
            />
        </View>
    );
}
