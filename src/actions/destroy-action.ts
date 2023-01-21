import Base from "deta/dist/types/base";
import { Express } from "express";
import { Entity } from "../types";

export default (app: Express) => (db: Base) => (entity: Entity) =>
  app.post(`/destroy-${entity.name}`, async function (req, res) {
    const { key } = req.body;
    await db.delete(key);
    res.redirect(`/${entity.name}`);
  });
