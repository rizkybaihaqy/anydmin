import { App } from "../types";

export const appSetting: App = {
  name: "test",
  entities: [
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
  ],
};
