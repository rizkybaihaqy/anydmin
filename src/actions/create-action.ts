import { Express } from "express";
import { Entity } from "../types";

export default (app: Express) => (entity: Entity) =>
  app.get(`/create-${entity.name}`, function (_, res) {
    res.render("form", {
      entity,
    });
  });
