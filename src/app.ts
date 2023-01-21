import * as Eta from "eta";
import express from "express";
import path from "path";
import createAction from "./actions/create-action";
import destroyAction from "./actions/destroy-action";
import indexAction from "./actions/index-action";
import storeAction from "./actions/store-action";
import { db } from "./db";
import entitiesLoader from "./loader/entities-loader";
import { Entity } from "./types";

const app = express();

app.engine("eta", Eta.renderFile);
app.set("view engine", "eta");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: false }));

const es: Entity[] = [
  {
    name: "user",
    rows: ["first_name", "last_name"],
  },
  {
    name: "post",
    rows: ["title", "body"],
  },
];

entitiesLoader(app)(es);
es.map((entity) => indexAction(app)(db)(entity));
es.map((entity) => createAction(app)(entity));
es.map((entity) => storeAction(app)(db)(entity));
es.map((entity) => destroyAction(app)(db)(entity));

export default app;
