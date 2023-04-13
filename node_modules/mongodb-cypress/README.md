# mongodb-cypress

**A plugin for Cypress for interacting with Mongodb**

## Integrate package with Cypress

### Cypress 10 and later

Setup your `cypress.config.js` like:

```JavaScript
const mongoCypress = require("mongodb-cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("task", mongoCypress.mongoSetup(config.env.mongodb));
    },
  },
  env: {
    mongodb: {
      uri: "<connectio uri>",
      db: "<db>",
      options:{}
    },
  },
});
```

Setup your `support/commands.js` like:

```JavaScript
const mongoCypress = require("mongodb-cypress");
mongoCypress.mongoFunctions();
```

### Cypress before v10

Setup your `plugins/index.js` like:

```JavaScript
const mongoCypress = require("mongodb-cypress");

module.exports = (on, config) => {
  on("task", mongoCypress.mongoSetup(config.env.mongodb));
};
```

And add the following to `support/commands.js`:

```JavaScript
const mongoCypress = require("mongodb-cypress");
mongoCypress.mongoFunctions();
```

#### Mongodb Connection Options and Usage

In order to custom to your mongo connection, add the [connection options](https://docs.mongodb.com/drivers/node/current/fundamentals/connection/#connection-options) to `cypress.json` under `mongodb.options` like:

```JSON
"env": {
  "mongodb":{
      "uri": "<connection uri>",
      "db" : "<db connecting to>",
      "options" : {}
  }
}
```

## Integrated Functionalities

```JavaScript
mongoFindMany(
  collection: string,
  filter?: Filter<Document>,
  options?: FindOptions
): Promise<WithId<Document>[]>;
mongoFindOne(
  collection: string,
  filter?: Filter<Document>,
  options?: FindOptions
): Promise<Document | null>;
mongoInsertOne(
  collection: string,
  item: OptionalId<Document>,
  options?: InsertOneOptions
): Promise<InsertOneResult<Document>>;
mongoInsertMany(
  collection: string,
  item: OptionalId<Document>[],
  options?: BulkWriteOptions
): Promise<InsertManyResult<Document>>;
mongoDeleteMany(
  collection: string,
  filter?: Filter<Document>
): Promise<DeleteResult>;
mongoDeleteOne(
  collection: string,
  filter?: Filter<Document>
): Promise<DeleteResult>;
mongoUpdateMany(
  collection: string,
  filter: Filter<Document>,
  update: UpdateFilter<Document>
): Promise<UpdateResult>;
mongoUpdateOne(
  collection: string,
  filter: Filter<Document>,
  update: UpdateFilter<Document>
): Promise<UpdateResult>;
```

All commands are integrated into the Cypress Chainable interface, so they can be called as:
`cy.mongoFindMany("categories", { cat: "Llibres" })`
