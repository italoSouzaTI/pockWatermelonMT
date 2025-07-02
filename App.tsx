import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Cliente, Home } from "./src/features";

export default function App() {
    return <Cliente />;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
