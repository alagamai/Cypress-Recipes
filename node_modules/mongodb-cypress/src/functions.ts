/// <reference types="cypress" />
/// <reference path="../index.d.ts" />

import {
  BulkWriteOptions,
  Document,
  Filter,
  FindOptions,
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

module.exports = function () {
  Cypress.Commands.add(
    "mongoFindMany",
    (
      collection: string,
      filter?: Filter<Document>,
      options?: FindOptions
    ): any => {
      return cy.task("mongoConnection", {
        fun: functions.mongoFindMany,
        collection: collection,
        findParameters: { filter: filter, options: options },
      });
    }
  );
  Cypress.Commands.add(
    "mongoFindOne",
    (
      collection: string,
      filter?: Filter<Document>,
      options?: FindOptions
    ): any => {
      return cy.task("mongoConnection", {
        fun: functions.mongoFindOne,
        collection: collection,
        findParameters: { filter: filter, options: options },
      });
    }
  );
  Cypress.Commands.add(
    "mongoInsertOne",
    (
      collection: string,
      item: OptionalId<Document>,
      options?: InsertOneOptions
    ): any => {
      return cy.task("mongoConnection", {
        fun: functions.mongoInsertOne,
        collection: collection,
        insertParameters: { item: item, options: options },
      });
    }
  );
  Cypress.Commands.add(
    "mongoInsertMany",
    (
      collection: string,
      item: OptionalId<Document>[],
      options?: BulkWriteOptions
    ): any => {
      return cy.task("mongoConnection", {
        fun: functions.mongoInsertMany,
        collection: collection,
        insertParameters: { item: item, options: options },
      });
    }
  );
  Cypress.Commands.add(
    "mongoDeleteMany",
    (collection: string, filter: Filter<Document>): any => {
      return cy.task("mongoConnection", {
        fun: functions.mongoDeleteMany,
        collection: collection,
        deleteParameters: { filter: filter },
      });
    }
  );
  Cypress.Commands.add(
    "mongoDeleteOne",
    (collection: string, filter: Filter<Document>): any => {
      return cy.task("mongoConnection", {
        fun: functions.mongoDeleteOne,
        collection: collection,
        deleteParameters: { filter: filter },
      });
    }
  );
  Cypress.Commands.add(
    "mongoUpdateMany",
    (
      collection: string,
      filter: Filter<Document>,
      update: UpdateFilter<Document>
    ): any => {
      return cy.task("mongoConnection", {
        fun: functions.mongoUpdateMany,
        collection: collection,
        updateParameters: { filter: filter, update: update },
      });
    }
  );
  Cypress.Commands.add(
    "mongoUpdateOne",
    (
      collection: string,
      filter: Filter<Document>,
      update: UpdateFilter<Document>
    ): any => {
      return cy.task("mongoConnection", {
        fun: functions.mongoUpdateOne,
        collection: collection,
        updateParameters: { filter: filter, update: update },
      });
    }
  );
};
