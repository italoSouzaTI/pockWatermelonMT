import { Text, TouchableOpacity, View } from "react-native";
import IConMaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
interface HeaderProps {
    label: string;
    isGoBack?: boolean;
}
export function Header({ label, isGoBack = false }: HeaderProps) {
    console.log("isGoBack", isGoBack);
    const { goBack } = useNavigation();
    const { top } = useSafeAreaInsets();
    return (
        <View
            style={{
                paddingTop: top,
                paddingBottom: 16,
                width: "100%",
                minHeight: 60,
                backgroundColor: "#F0F0F0",
                paddingHorizontal: 16,
                alignItems: "center",
                borderBottomWidth: 1,
                borderBottomColor: "#E0E0E0",
                flexDirection: "row",
                gap: 8,
            }}
        >
            {isGoBack && (
                <TouchableOpacity onPress={() => goBack()}>
                    <IConMaterialIcons size={32} name="keyboard-arrow-left" color="gray" />
                </TouchableOpacity>
            )}
            <Text style={{ fontWeight: "800", fontSize: 20 }}>{label}</Text>
        </View>
    );
}
