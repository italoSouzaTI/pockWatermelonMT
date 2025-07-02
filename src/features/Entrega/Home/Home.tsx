import { FlatList, View } from "react-native";
import styleHome from "./style";
import { Card } from "./components/Card/Card";

export function Home() {
    function renderItem(item: any) {
        return <Card item={item} />;
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
