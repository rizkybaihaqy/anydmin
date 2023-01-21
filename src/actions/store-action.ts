import Base from "deta/dist/types/base";
import { Express } from "express";
import { Entity } from "../types";

export default (app: Express) => (db: Base) => (entity: Entity) =>
  app.post(`/save-${entity.name}`, async function (req, res) {
    await db.put({ data: req.body, type: entity.name });
    res.redirect(`/${entity.name}`);
  });
