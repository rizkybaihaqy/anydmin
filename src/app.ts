import * as Eta from "eta";
import express from "express";
import upload from "express-fileupload";
import path from "path";
import createAction from "./actions/create-action";
import destroyAction from "./actions/destroy-action";
import indexAction from "./actions/index-action";
import storeAction from "./actions/store-action";
import config from "./config";
import { db } from "./db";
import settingsLoader from "./loader/settings-loader";
import { storage } from "./storage";

const app = express();
const appSetting = config.appSetting;

app.engine("eta", Eta.renderFile);
app.set("view engine", "eta");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: false }));
app.use(upload());

settingsLoader(app)(appSetting);
appSetting.entities.map((entity) => indexAction(app)(db)(storage)(entity));
appSetting.entities.map((entity) => createAction(app)(entity));
appSetting.entities.map((entity) => storeAction(app)(db)(storage)(entity));
appSetting.entities.map((entity) => destroyAction(app)(db)(storage)(entity));

export default app;
