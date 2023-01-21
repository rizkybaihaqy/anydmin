import Base from "deta/dist/types/base";
import Drive from "deta/dist/types/drive";
import { Express } from "express";
import { UploadedFile } from "express-fileupload";
import { Entity } from "../types";

export default (app: Express) =>
  (db: Base) =>
  (storage: Drive) =>
  (entity: Entity) =>
    app.post(`/save-${entity.name}`, async function (req, res) {
      if (!req.files || Object.keys(req.files).length === 0) {
        res.redirect(`/${entity.name}`);
      }

      const rowsText = entity.rows.filter((row) => row.type === "text");
      const rowsFile = entity.rows.filter((row) => row.type === "file");

      const uploaded = await Promise.all(
        rowsFile.map(async (row) => {
          const file = req.files![row.name] as UploadedFile;
          const response = await storage.put(file.name, {
            data: file.data,
          });
          return response;
        })
      );

      const files = rowsFile.reduce(
        (obj, row, i) => ({
          ...obj,
          [row.name]: uploaded[i],
        }),
        {}
      );

      const texts = rowsText.reduce(
        (obj, row) => ({
          ...obj,
          [row.name]: req.body[row.name],
        }),
        {}
      );

      const final = { ...texts, ...files };

      await db.put({ data: final, type: entity.name });
      res.redirect(`/${entity.name}`);
    });
