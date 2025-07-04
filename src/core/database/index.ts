import { Platform } from "react-native";
import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import schema from "./schema";
import migrations from "./migrations";
import { NOME_DATABASE } from "./constants";
import { EmpresaModel, ClienteModel, ItemPedidoModel, MapaDeCargaModel, PedidoModel } from "./model";
// import Post from './model/Post' // ⬅️ You'll import your Models here

// First, create the adapter to the underlying database:
const adapter = new SQLiteAdapter({
    schema,
    migrations,
    dbName: NOME_DATABASE, // The name of the database file
    jsi: Platform.OS === "ios" ? true : false /* Platform.OS === 'ios' */,
    // (optional, but you should implement this method)
    onSetUpError: (error) => {
        throw new Error("Database failed to load -- offer the user to reload the app or log out", error);
    },
});

// Then, make a Watermelon database from it!
export const database = new Database({
    adapter,
    modelClasses: [EmpresaModel, ClienteModel, ItemPedidoModel, MapaDeCargaModel, PedidoModel],
});
