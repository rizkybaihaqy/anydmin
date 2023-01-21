import Base from "deta/dist/types/base";
import Drive from "deta/dist/types/drive";
import { Express } from "express";
import { Entity } from "../types";

export default (app: Express) =>
  (db: Base) =>
  (storage: Drive) =>
  (entity: Entity) =>
    app.get(`/${entity.name}`, async function (req, res) {
      const fetchRes = await db.fetch({ type: entity.name });
      const itemsRes = fetchRes.items;
      const rowsFile = entity.rows.filter((row) => row.type === "file");

      const itemsResWithBase64 = await Promise.all(
        itemsRes.map(async ({ data, key, type }) => {
          const itemData = data as any;
          const rows = await rowsFile.reduce(async (promise, row) => {
            const response = await storage.get(itemData[row.name] as string);
            const arrayBuffer = await response!.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const base64 = buffer.toString("base64");
            const images: any = await promise;
            images[row.name] = "data:image/jpeg;base64," + base64;
            return images;
          }, Promise.resolve({}));
          return { data: { ...itemData, ...rows }, key, type };
        })
      );

      res.render("data", {
        itemsRes: itemsResWithBase64,
        entity,
      });
    });
