import PocketBase from "pocketbase";

const URL = process.env.URL_POCKETBASE_PROD || "http://127.0.0.1:8090";
export const pb = new PocketBase(URL);
