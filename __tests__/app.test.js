const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");
const sorted = require("jest-sorted");

beforeEach(() => seed(testData));

afterAll(() => db.end());

describe("get welcome message", () => {
  test("returns a status code of 200", () => {
    return request(app).get("/api").expect(200);
  });
  test("should return a welcome message to the user", () => {
    return request(app)
      .get("/api")
      .then(({ body }) => {
        expect(body.msg).toEqual("Connection established");
      });
  });
});
describe("returns all categories from the GET category request", () => {
  test("returns an array of category objects, each containing a property of SLUG and a property of DESCRIPTION", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then(({ body }) => {
        expect(body.categories[0]).hasOwnProperty("slug");
        expect(body.categories[1]).hasOwnProperty("description");
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
