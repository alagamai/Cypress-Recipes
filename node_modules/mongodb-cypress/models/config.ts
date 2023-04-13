import { MongoOptions } from "mongodb";

export type dbConfig = {
  uri: string;
  db: string;
  options: MongoOptions;
};
