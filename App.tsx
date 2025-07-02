import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { RouteStack } from "./src/routes/routeStack";
import { SafeAreaProvider } from "react-native-safe-area-context";
export default function App() {
    return (
        <>
            <StatusBar style="dark" />
            <SafeAreaProvider>
                <NavigationContainer>
                    <RouteStack />
                </NavigationContainer>
            </SafeAreaProvider>
        </>
    );
}
