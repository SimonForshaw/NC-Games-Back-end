const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");
const sorted = require("jest-sorted");

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

describe("returns all endpoints avaliable under '/api'", () => {
  test("returns a JSON object of objects, each containing a property of 'description', 'queries' and 'exampleResponse'", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((res) => {
        Object.keys(res.body.endpoints).forEach((endpointsObj) => {
          expect(endpointsObj).hasOwnProperty("description");
          expect(endpointsObj).hasOwnProperty("queries");
          expect(endpointsObj).hasOwnProperty("exampleResponse");
        });
      });
  });
});

describe("returns an review that corresponds to the review_id that is passed in", () => {
  test("returns an review object with the following properties: review_id, title, review_body, designer, review_img_url, votes, category, owner and created_at", () => {
    return request(app)
      .get("/api/reviews/1")
      .then(({ body }) => {
        expect(body.review.title).toEqual("Agricola");
        expect(body.review.designer).toEqual("Uwe Rosenberg");
        expect(body.review.owner).toEqual("mallionaire");
        expect(body.review.review_img_url).toEqual(
          "https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?w=700&h=700"
        );
        expect(body.review.review_body).toEqual("Farmyard fun!");
        expect(body.review.category).toEqual("euro game");
        expect(body.review.created_at).toEqual("2021-01-18T10:00:20.514Z");
        expect(body.review.votes).toEqual(1);
      });
  });
  test("returns the correct review depending on the endpoint that the user inputs", () => {
    return request(app)
      .get("/api/reviews/5")
      .then(({ body }) => {
        expect(body.review.review_id).toEqual(5);
      });
  });
  test("gives a 404 error when a valid but non-existant path is passed in", () => {
    return request(app)
      .get("/api/reviews/1400")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Path not found");
      });
  });
  test("gives a 400 error when a valid but non-existant path is passed in", () => {
    return request(app)
      .get("/api/reviews/nonsense")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
});

// describe("returns all reviews from the GET reviews request", () => {
//   test("returns an array of review objects, each containing a property of review_id, title, review_body, designer, review_img_url, votes, category, owner and created_at", () => {
//     return request(app)
//       .get("/api/reviews/1")
//       .expect(200)
//       .then(({ body }) => {
//         body.reviews.forEach((reviewsObj) => {
//           expect(reviewsObj).hasOwnProperty("review_id");
//           expect(reviewsObj).hasOwnProperty("title");
//           expect(reviewsObj).hasOwnProperty("review_body");
//           expect(reviewsObj).hasOwnProperty("designer");
//           expect(reviewsObj).hasOwnProperty("review_img_url");
//           expect(reviewsObj).hasOwnProperty("votes");
//           expect(reviewsObj).hasOwnProperty("category");
//           expect(reviewsObj).hasOwnProperty("owner");
//           expect(reviewsObj).hasOwnProperty("created_at");
//         });
//         expect(Array.isArray(body.reviews));
//       });
//   });
// });
