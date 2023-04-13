import {
  Collection,
  Filter,
  FindOptions,
  MongoClient,
  MongoClientOptions,
  Document,
  InsertOneOptions,
  OptionalId,
  UpdateFilter,
} from "mongodb";

export enum functions {
  "mongoFindOne",
  "mongoFindMany",
  "mongoInsertOne",
  "mongoInsertMany",
  "mongoDeleteMany",
  "mongoDeleteOne",
  "mongoUpdateMany",
  "mongoUpdateOne",
}

module.exports = (dbConfig: {
  uri: string;
  db: string;
  options?: MongoClientOptions;
}) => {
  return {
    mongoConnection: async (arg: {
      fun: functions;
      collection: string;
      findParameters?: { filter?: Filter<Document>; findOps?: FindOptions };
      insertParameters?: {
        item: OptionalId<Document> | OptionalId<Document>[];
        options?: InsertOneOptions;
      };
      deleteParameters?: { filter: Filter<Document> };
      updateParameters?: {
        filter: Filter<Document>;
        update: UpdateFilter<Document>;
      };
      db?: string;
    }): Promise<any> => {
      const mydb = arg.db ? arg.db : dbConfig.db;
      try {
        const c = await new MongoClient(
          dbConfig.uri,
          dbConfig.options
        ).connect();
        const db: Collection<Document> = c.db(mydb).collection(arg.collection);
        switch (arg.fun) {
          //
          case functions.mongoFindMany:
            if (arg.findParameters && arg.findParameters.filter) {
              return await db
                .find(arg.findParameters.filter, arg.findParameters.findOps)
                .toArray();
            } else {
              return db.find().toArray();
            }
            break;
          case functions.mongoFindOne:
            if (arg.findParameters && arg.findParameters.filter) {
              return await db.findOne(
                arg.findParameters.filter,
                arg.findParameters.findOps
              );
            }
            break;

          case functions.mongoInsertOne:
            if (arg.insertParameters && arg.insertParameters.options) {
              return await db.insertOne(
                arg.insertParameters.item,
                arg.insertParameters.options
              );
            } else {
              return await db.insertOne(arg.insertParameters!.item);
            }
            break;

          case functions.mongoInsertMany:
            if (arg.insertParameters && arg.insertParameters.options) {
              return await db.insertMany(
                arg.insertParameters.item as OptionalId<Document>[],
                arg.insertParameters.options
              );
            } else {
              return await db.insertMany(
                arg!.insertParameters!.item as OptionalId<Document>[]
              );
            }
            break;

          case functions.mongoDeleteMany:
            return await db.deleteMany(arg.deleteParameters!.filter);
            break;

          case functions.mongoDeleteOne:
            return await db.deleteOne(arg.deleteParameters!.filter);
            break;

          case functions.mongoUpdateMany:
            return await db.updateMany(
              arg.updateParameters!.filter,
              arg.updateParameters!.update
            );
            break;

          case functions.mongoUpdateOne:
            return await db.updateOne(
              arg.updateParameters!.filter,
              arg.updateParameters!.update
            );
            break;

          default:
            throw `function ${arg.fun} not supported`;
            break;
        }
      } catch (e) {
        throw e;
      }
    },
  };
};
