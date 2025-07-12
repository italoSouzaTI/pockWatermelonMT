import * as FileSystem from "expo-file-system";
import { Alert, Platform } from "react-native";
import Share, { ShareOptions } from "react-native-share";
import { NOME_DATABASE } from "../../../../core/database/constants";

const getRealDatabasePath = async () => {
    try {
        const dbName = `${NOME_DATABASE}.db`;
        const packageName = "com.italo.pockwatermelonMt";
        // Caminho do diretório (converta para URI do FileSystem)

        const appDir = Platform.select({
            android: `${FileSystem.documentDirectory}../${dbName}`,
            ios: `${FileSystem.documentDirectory}SQLite/${dbName}`,
        }); // Volta para /data/user/0/com.dcoimbra.appmotorista/

        return appDir;
    } catch (error) {
        console.error("Erro ao listar arquivos:", error);
        return [];
    }
};

export const backupDatabase = async () => {
    try {
        const sourcePath = await getRealDatabasePath();
        const sourceInfo = await FileSystem.getInfoAsync(sourcePath);
        console.log(`Tamanho original: ${sourceInfo.size} bytes`); // Verifique aqui
        if (!sourcePath) {
            console.error("Não foi possível localizar o banco de dados");
            return null;
        }
        // Local público para onde copiaremos (pasta de cache)
        const publicPath = `${FileSystem.cacheDirectory}appMotoristaDB_${Date.now()}.db`;
        await FileSystem.copyAsync({ from: sourcePath, to: publicPath });
        const backupInfo = await FileSystem.getInfoAsync(sourcePath);
        console.log(`Tamanho do backup: ${backupInfo.size} bytes`);
        console.log(`Tamanho do backup`, backupInfo);
        console.log(`backupInfo`, backupInfo);
        if (backupInfo.size == undefined) {
            console.error("Backup não foi criado com sucesso");
            Alert.alert("Backup não foi criado com sucesso");
            return;
        }
        const options: ShareOptions = {
            title: "Backup do Banco de Dados",
            message: "Segue em anexo o backup do banco de dados do AppMotorista",
            url: `file://${backupInfo.uri}`,
            type: "application/octet-stream",
            subject: "Backup do AppMotorista", // Assunto do e-mail
            email: "ytakiko3@gmail.com", // Pode pré-definir um e-mail se quiser
            failOnCancel: false,
        };
        await Share.open(options);
    } catch (error) {
        console.error("Erro ao compartilhar:", error);
        Alert.alert("Erro", "Não foi possível compartilhar o backup");
    }
};
