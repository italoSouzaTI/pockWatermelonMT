import { FlatList, View } from "react-native";
import styleHome from "./style";
import { Card } from "./components/Card/Card";
import { Header } from "../../../components";

export function Home({ navigation }) {
    function renderItem(item: any) {
        return (
            <Card
                item={item}
                onPress={() => {
                    navigation.navigate("Cliente");
                }}
            />
        );
    }
    return (
        <View style={styleHome.container}>
            <Header label="Mapas" />
            <FlatList
                data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                contentContainerStyle={{ padding: 16, gap: 16, flex: 1 }}
                renderItem={({ item }) => renderItem(item)}
            />
        </View>
    );
}
