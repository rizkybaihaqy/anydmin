import { Express } from "express";
import { Entity } from "../types";

export default (app: Express) => (entities: Entity[]) =>
  app.use((_, res, next) => {
    res.locals = { entities, ...res.locals };
    next();
  });
