import { Deta } from "deta";
import config from "../config";

const deta = Deta(config.DETA_KEY);

export const storage = deta.Drive("anydmin");
