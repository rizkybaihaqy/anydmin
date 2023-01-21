import Base from "deta/dist/types/base";
import Drive from "deta/dist/types/drive";
import { Express } from "express";
import { Entity } from "../types";

export default (app: Express) =>
  (db: Base) =>
  (storage: Drive) =>
  (entity: Entity) =>
    app.post(`/destroy-${entity.name}`, async function (req, res) {
      const { key } = req.body;
      const item: any = await db.get(key);
      const rowsFile = entity.rows.filter((row) => row.type === "file");

      await Promise.all(
        rowsFile.map(async (row) => {
          const itemData = item.data as any;
          const name = itemData[row.name] as string;
          const response = await storage.delete(name);
          return response;
        })
      );
      await db.delete(key);
      res.redirect(`/${entity.name}`);
    });
