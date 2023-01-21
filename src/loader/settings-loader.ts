import { Express } from "express";
import { App } from "../types";

export default (app: Express) => (appSetting: App) =>
  app.use((_, res, next) => {
    res.locals = { appSetting, ...res.locals };
    next();
  });
