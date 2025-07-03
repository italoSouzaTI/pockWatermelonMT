import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { RouteStack } from "./src/routes/routeStack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect } from "react";
import { database } from "./src/core/database";
export default function App() {
    if (__DEV__) {
        require("./ReactotronConfig");
    }
    useEffect(() => {
        database;
    }, []);
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
