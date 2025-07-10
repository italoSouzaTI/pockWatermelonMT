import { Text, TextInput, TextInputProps, View } from "react-native";

interface TextAreaProps extends TextInputProps {
    label: string;
    placeholder: string;
}
export function TextArea({ placeholder, label, ...restTextArea }: TextAreaProps) {
    return (
        <View style={{ width: "100%", gap: 8 }}>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>{label}</Text>
            <View
                style={{
                    width: "100%",
                    borderRadius: 8,
                    height: 200,
                    backgroundColor: "#e6e6e6",
                    paddingHorizontal: 16,
                }}
            >
                <TextInput
                    placeholder={placeholder}
                    multiline={true}
                    style={{
                        textAlignVertical: "top",
                        top: 16,
                    }}
                    {...restTextArea}
                />
            </View>
        </View>
    );
}
