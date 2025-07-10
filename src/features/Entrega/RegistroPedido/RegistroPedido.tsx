import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Input } from "./components/Input/Input";
import { Foto } from "./components/Foto/Foto";
import { TextArea } from "./components/TextArea/TextArea";
import { Header } from "../../../components";
import { useRegistroPedidoView } from "./useRegistroPedidoView";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
export function RegistroPedido() {
    const {
        cameraRef,
        nome,
        setNome,
        documento,
        setDocumento,
        canhoto,
        setCanhoto,
        canhotoObs,
        setCanhotoObs,
        boleto,
        setBoleto,
        boletoObs,
        setBoletoObs,
        anexo,
        setAnexo,
        anexoObs,
        setAnexoObs,
        salvar,
        abrirCamera,
        cameraAcao,
        takePicture,
    } = useRegistroPedidoView();
    return (
        <>
            <Header isGoBack label="Registro pedido" />
            {!abrirCamera ? (
                <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16, gap: 16, paddingBottom: 32 }}>
                    <Input
                        label="Nome completo (Obrigatório)"
                        placeholder="Digite seu nome completo"
                        value={nome}
                        onChangeText={setNome}
                    />
                    <Input
                        label="Documento"
                        placeholder="Digite seu documento"
                        value={documento}
                        onChangeText={setDocumento}
                    />
                    <Foto label="canhoto" img={canhoto} onPress={cameraAcao} />
                    <TextArea
                        label="Observação do canhoto"
                        placeholder="Descreva algo sobre canhoto"
                        value={canhotoObs}
                        onChangeText={setCanhotoObs}
                    />
                    <Foto label="boleto" img={boleto} onPress={cameraAcao} />
                    <TextArea
                        label="Observação do boleto"
                        placeholder="Descreva algo sobre boleto"
                        value={boletoObs}
                        onChangeText={setBoletoObs}
                    />
                    <Foto label="anexo" img={anexo} onPress={cameraAcao} />
                    <TextArea
                        label="Observação do anexo"
                        placeholder="Descreva algo sobre anexo"
                        value={anexoObs}
                        onChangeText={setAnexoObs}
                    />
                    <TouchableOpacity
                        onPress={salvar}
                        style={{ backgroundColor: "#4CAF50", padding: 16, borderRadius: 8, alignItems: "center" }}
                    >
                        <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>Salvar</Text>
                    </TouchableOpacity>
                </ScrollView>
            ) : (
                <CameraView style={{ flex: 1 }} facing={"back"} ref={cameraRef}>
                    <TouchableOpacity style={styles.button} onPress={takePicture}>
                        <Text style={styles.text}> Tirar Foto </Text>
                    </TouchableOpacity>
                </CameraView>
            )}
        </>
    );
}
const styles = StyleSheet.create({
    button: {
        alignSelf: "flex-end",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
        padding: 15,
        borderRadius: 10,
    },
    text: {
        fontSize: 18,
        color: "white",
    },
});
