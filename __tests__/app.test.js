const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");
const sorted = require("jest-sorted");
const categories = require("../db/data/test-data/categories");

beforeEach(() => seed(testData));

afterAll(() => db.end());

describe("returns all categories from the GET category request", () => {
  test("returns an array of category objects, each containing a property of SLUG and a property of DESCRIPTION", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then(({ body }) => {
        body.categories.forEach((categoriesObj) => {
          expect(categoriesObj).hasOwnProperty("slug");
          expect(categoriesObj).hasOwnProperty("description");
        });
        expect(Array.isArray(body.categories));
      });
  });
  test("404 invalid path", () => {
    return request(app)
      .get("/invalid-path")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Path not found");
      });
  });
});
