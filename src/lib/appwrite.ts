import { Account, Client, Databases, ID, TablesDB } from "appwrite";

export const APPWRITE_ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT;
const APPWRITE_PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
export const APPWRITE_DATABASE = import.meta.env.VITE_APPWRITE_DATABASE_ID;
export const COLLECTION_ID_PRODUCTS = import.meta.env.VITE_APPWRITE_TABLE_ID;

const client = new Client();

client.setEndpoint(APPWRITE_ENDPOINT).setProject(APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);
export const tablesDB = new TablesDB(client);
export const id = ID;
export default client;
