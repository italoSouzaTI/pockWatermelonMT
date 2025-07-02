import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Cliente, Home, Pedidos, RegistroPedido } from "../features";
const Stack = createNativeStackNavigator();
export function RouteStack() {
    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Cliente" component={Cliente} />
            <Stack.Screen name="Pedidos" component={Pedidos} />
            <Stack.Screen name="RegistroPedido" component={RegistroPedido} />
        </Stack.Navigator>
    );
}
