export interface Row {
  name: string;
  type: "text" | "file";
}

export interface Entity {
  name: string;
  rows: Row[];
}

export interface App {
  name: string;
  entities: Entity[];
}
