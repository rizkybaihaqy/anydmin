import Base from "deta/dist/types/base";
import { Express } from "express";
import { Entity } from "../types";

export default (app: Express) => (db: Base) => (entity: Entity) =>
  app.get(`/${entity.name}`, async function (req, res) {
    const fetchRes = await db.fetch({ type: entity.name });
    const itemsRes = fetchRes.items;
    res.render("data", {
      itemsRes,
      entity,
    });
  });
