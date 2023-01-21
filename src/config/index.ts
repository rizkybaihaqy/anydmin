import * as dotenv from "dotenv";
import { appSetting } from "./app";
dotenv.config();

export default {
  DETA_KEY: process.env.DETA_KEY,
  appSetting,
};
