import { Deta } from "deta";
import config from "../config";

const deta = Deta(config.DETA_KEY);

export const db = deta.Base("anydmin");
