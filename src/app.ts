import * as Eta from "eta";
import express from "express";
import upload from "express-fileupload";
import path from "path";
import createAction from "./actions/create-action";
import destroyAction from "./actions/destroy-action";
import indexAction from "./actions/index-action";
import storeAction from "./actions/store-action";
import { db } from "./db";
import entitiesLoader from "./loader/entities-loader";
import { storage } from "./storage";
import { Entity } from "./types";

const app = express();

app.engine("eta", Eta.renderFile);
app.set("view engine", "eta");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: false }));
app.use(upload());

const es: Entity[] = [
  {
    name: "user",
    rows: [
      { name: "first_name", type: "text" },
      { name: "last_name", type: "text" },
      { name: "avatar", type: "file" },
    ],
  },
  {
    name: "post",
    rows: [
      { name: "title", type: "text" },
      { name: "body", type: "text" },
      { name: "cover", type: "file" },
      { name: "thumbnail", type: "file" },
    ],
  },
];

entitiesLoader(app)(es);
es.map((entity) => indexAction(app)(db)(storage)(entity));
es.map((entity) => createAction(app)(entity));
es.map((entity) => storeAction(app)(db)(storage)(entity));
es.map((entity) => destroyAction(app)(db)(storage)(entity));

export default app;
