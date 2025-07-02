import { FlatList, View } from "react-native";
import { CardCliente } from "./components/CardCliente/CardCliente";
import styleHome from "../Home/style";
import { Header } from "../../../components";

export function Cliente() {
    function renderItem(item: any) {
        return <CardCliente item={item} />;
    }
    return (
        <View style={styleHome.container}>
            <Header isGoBack label="Lista de clientes" />
            <FlatList
                data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                contentContainerStyle={{ padding: 16, gap: 16 }}
                renderItem={({ item }) => renderItem(item)}
            />
        </View>
    );
}
