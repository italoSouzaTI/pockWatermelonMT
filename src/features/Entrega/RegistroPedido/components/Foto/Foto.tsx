import { Text, TouchableOpacity, View } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome";

interface InputProps {
    label: string;
}
export function Foto({ label }: InputProps) {
    return (
        <View style={{ width: "100%", gap: 8 }}>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>{`Registar foto do ${label}`}</Text>
            <TouchableOpacity
                style={{
                    width: "100%",
                    height: 200,
                    borderRadius: 8,
                    backgroundColor: "#F0F0F0",
                    justifyContent: "center",
                    alignItems: "center",
                    borderStyle: "dashed",
                    borderWidth: 1,
                    borderColor: "#888",
                    gap: 8,
                }}
            >
                <Icon name="camera" color="gray" size={28} />
                <Text style={{ fontSize: 14, color: "#888" }}>{`Foto do ${label}`}</Text>
            </TouchableOpacity>
        </View>
    );
}
