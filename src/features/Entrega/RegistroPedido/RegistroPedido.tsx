import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Input } from "./components/Input/Input";
import { Foto } from "./components/Foto/Foto";
import { TextArea } from "./components/TextArea/TextArea";
import { Header } from "../../../components";

export function RegistroPedido() {
    return (
        <>
            <Header isGoBack label="Registro pedido" />
            <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16, gap: 16, paddingBottom: 32 }}>
                <Input label="Nome completo (Obrigatório)" placeholder="Digite seu nome completo" />
                <Input label="Documento" placeholder="Digite seu documento" />
                <Foto label="canhoto" />
                <TextArea label="Observação do canhoto" placeholder="Descreva algo sobre canhoto" />
                <Foto label="boleto" />
                <TextArea label="Observação do boleto" placeholder="Descreva algo sobre boleto" />
                <Foto label="anexo" />
                <TextArea label="Observação do anexo" placeholder="Descreva algo sobre anexo" />
                <TouchableOpacity
                    style={{ backgroundColor: "#4CAF50", padding: 16, borderRadius: 8, alignItems: "center" }}
                >
                    <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>Salvar</Text>
                </TouchableOpacity>
            </ScrollView>
        </>
    );
}
