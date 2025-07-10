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
                    backgroundColor: "#e6e6e6",
                    paddingHorizontal: 16,
                    justifyContent: "center",
                    marginBottom: 16,
                }}
            >
                <TextInput placeholder={placeholder} {...restInput} />
            </View>
        </View>
    );
}
