import * as FileSystem from "expo-file-system";
import { Alert, Platform } from "react-native";
import * as Sharing from "expo-sharing";
import { NOME_DATABASE } from "../../../../core/database/constants";

const getRealDatabasePath = async () => {
    try {
        const dbName = `${NOME_DATABASE}.db`;
        // Caminho do diretório (converta para URI do FileSystem)
        const appDir = Platform.select({
            android: `${FileSystem.documentDirectory}../${dbName}`,
            ios: `${FileSystem.documentDirectory}SQLite/${dbName}`,
        });
        return appDir;
    } catch (error) {
        console.error("Erro ao listar arquivos:", error);
        return null;
    }
};

export const backupDatabase = async () => {
    try {
        const sourcePath = await getRealDatabasePath();

        if (!sourcePath) {
            console.error("Não foi possível localizar o banco de dados");
            return null;
        }

        // Verifica se o sharing está disponível
        if (!(await Sharing.isAvailableAsync())) {
            Alert.alert("Compartilhamento não disponível neste dispositivo");
            return;
        }

        // Local público para onde copiaremos (pasta de cache)
        const publicPath = `${FileSystem.cacheDirectory}appMotoristaDB_${Date.now()}.db`;

        // Copia o arquivo para um local compartilhável
        await FileSystem.copyAsync({ from: sourcePath, to: publicPath });

        const backupInfo = await FileSystem.getInfoAsync(publicPath);

        if (!backupInfo.exists || backupInfo.size === undefined) {
            console.error("Backup não foi criado com sucesso");
            Alert.alert("Backup não foi criado com sucesso");
            return;
        }

        console.log(`Tamanho do backup: ${backupInfo.size} bytes`);

        // Compartilha o arquivo
        await Sharing.shareAsync(backupInfo.uri, {
            dialogTitle: "Backup do Banco de Dados",
            mimeType: "application/octet-stream",
            UTI: "public.data", // Especifica o tipo de arquivo para iOS
        });
    } catch (error) {
        console.error("Erro ao compartilhar:", error);
        Alert.alert("Erro", "Não foi possível compartilhar o backup");
    }
};
