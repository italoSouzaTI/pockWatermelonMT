import { Text, TextInput, TextInputProps, View } from "react-native";

interface InputProps extends TextInputProps {
    label: string;
    placeholder: string;
}
export function Input({ placeholder, label, ...restInput }: InputProps) {
    return (
        <View style={{ width: "100%", gap: 8 }}>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>{label}</Text>
            <View
                style={{
                    width: "100%",
                    height: 50,
                    borderRadius: 8,
                    backgroundColor: "#F0F0F0",
                    paddingHorizontal: 16,
                    justifyContent: "center",
                    marginBottom: 16,
                }}
                {...restInput}
            >
                <TextInput placeholder={placeholder} />
            </View>
        </View>
    );
}
