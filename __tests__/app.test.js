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
  test("gives a 400 error when a path with an invalid text representation is passed in", () => {
    return request(app)
      .get("/api/reviews/nonsense")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
});

describe("returns all reviews from the GET reviews request", () => {
  test("returns an array of review objects, each containing a property of review_id, title, designer, review_img_url, votes, category, owner and created_at and does not contain a property of review_body ", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then((response) => {
        response.body.reviews.forEach((reviewsObj) => {
          expect(reviewsObj).hasOwnProperty("review_id");
          expect(reviewsObj).hasOwnProperty("title");
          expect(reviewsObj).not.hasOwnProperty("review_body");
          expect(reviewsObj).hasOwnProperty("designer");
          expect(reviewsObj).hasOwnProperty("review_img_url");
          expect(reviewsObj).hasOwnProperty("votes");
          expect(reviewsObj).hasOwnProperty("category");
          expect(reviewsObj).hasOwnProperty("owner");
          expect(reviewsObj).hasOwnProperty("created_at");
          expect(reviewsObj).hasOwnProperty("comment_count");
        });
        expect(Array.isArray(response.body.reviews));
        expect(response.body.reviews.length).toBe(13);
      });
  });

  test("each review has the correct review_id", () => {
    return request(app)
      .get("/api/reviews/3")
      .then(({ body }) => {
        expect(body.review.review_id).toEqual(3);
      });
  });
  test("returns with the oldest reviews first", () => {
    return request(app)
      .get("/api/reviews")
      .then(({ body }) => {
        expect([
          body.reviews[0].created_at,
          body.reviews[1].created_at,
          body.reviews[2].created_at,
          body.reviews[3].created_at,
        ]).toBeSorted({ descending: true });
      });
  });
});
describe("returns all comments that corresponds to the review_id that is passed in", () => {
  test("returns an array of comment objects, each containing a property of comment_id, votes, created_at, author, body and review_id ", () => {
    return request(app)
      .get("/api/reviews/2/comments")
      .expect(200)
      .then(({ body }) => {
        body.comment.forEach((commentsObj) => {
          expect(commentsObj).hasOwnProperty("comment_id");
          expect(commentsObj).hasOwnProperty("votes");
          expect(commentsObj).hasOwnProperty("created_at");
          expect(commentsObj).hasOwnProperty("author");
          expect(commentsObj).hasOwnProperty("body");
          expect(commentsObj).hasOwnProperty("review_id");
        });
        expect(Array.isArray(body.comment));
      });
  });

  test("each review has the correct review_id", () => {
    return request(app)
      .get("/api/reviews/3/comments")
      .then(({ body }) => {
        expect(body.comment[0].review_id).toEqual(3);
      });
  });
  test("returns with the oldest reviews first", () => {
    return request(app)
      .get("/api/reviews/3/comments")
      .then(({ body }) => {
        expect([
          body.comment[0].created_at,
          body.comment[1].created_at,
        ]).toBeSorted({ descending: true });
      });
  });
  test("gives a 404 error when a valid but non-existant path is passed in", () => {
    return request(app)
      .get("/api/reviews/1400/comments")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Path not found");
      });
  });
  test("gives a 400 error when a path with an invalid text representation is passed in", () => {
    return request(app)
      .get("/api/reviews/nonsense/comments")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
});

describe("posts comments relating to an review (depending on the review_id that is passed in", () => {
  test("should respond with a 201 status", () => {
    const comment = {
      author: "bainesface",
      body: "I find this game plays better on PC",
    };
    return request(app)
      .post("/api/reviews/2/comments")
      .send(comment)
      .expect(201);
  });
  test("adds a comment with the correct username and body and returns an object with the correct information", () => {
    const comment = {
      author: "bainesface",
      body: "I first played this game 10 years ago, glas to see it is still going strong",
    };
    return request(app)
      .post("/api/reviews/2/comments")
      .send(comment)
      .then((response) => {
        const addedComment = response.body.commentData;
        expect(addedComment.comment_id).toEqual(7);
        expect(addedComment.author).toEqual("bainesface");
        expect(addedComment.body).toEqual(
          "I first played this game 10 years ago, glas to see it is still going strong"
        );
      });
  });
  test("if an attempt is made to post comments to an review id that does not exist, respond with an error", () => {
    const comment = { author: "bainesface", body: "Bad game" };

    return request(app)
      .post("/api/reviews/1400/comments")
      .send(comment)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toEqual("Path not found");
      });
  });
  test("returns an error when an object with invalid keys is passed in", () => {
    const comment = { developer: "bainesface", comment: "Bad game" };

    return request(app)
      .post("/api/reviews/2/comments")
      .send(comment)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toEqual("Bad Request");
      });
  });
  test("returns an error when an object with invalid values is passed in", () => {
    const comment = { author: "unknownUser", comment: ["invalid comment"] };

    return request(app)
      .post("/api/reviews/2/comments")
      .send(comment)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toEqual("Bad Request");
      });
  });
});

describe("patches a comment with an updated vote count and returns an object containing the new vote count", () => {
  test("should respond with a 201 status", () => {
    const newVotes = { inc_votes: 1 };
    return request(app).patch("/api/reviews/2").expect(201).send(newVotes);
  });
  test("should update the comment with a new vote count and return the new vote count", () => {
    const newVotes = { inc_votes: 3 };
    return request(app)
      .patch("/api/reviews/3")
      .expect(201)
      .send(newVotes)
      .then(({ body }) => {
        expect(body.review[0]).toEqual({
          category: "social deduction",
          created_at: "2021-01-18T10:01:41.251Z",
          designer: "Akihisa Okui",
          owner: "bainesface",
          review_body: "We couldn't find the werewolf!",
          review_id: 3,
          votes: 7,
          review_img_url:
            "https://images.pexels.com/photos/5350049/pexels-photo-5350049.jpeg?w=700&h=700",
          title: "Ultimate Werewolf",
          votes: 8,
        });
      });
  });
  test("vote count patch works with a negative number", () => {
    const newVotes = { inc_votes: -3 };
    return request(app)
      .patch("/api/reviews/3")
      .expect(201)
      .send(newVotes)
      .then(({ body }) => {
        expect(body.review[0]).toEqual({
          review_id: 3,
          title: "Ultimate Werewolf",
          designer: "Akihisa Okui",
          owner: "bainesface",
          review_img_url:
            "https://images.pexels.com/photos/5350049/pexels-photo-5350049.jpeg?w=700&h=700",
          review_body: "We couldn't find the werewolf!",
          category: "social deduction",
          created_at: "2021-01-18T10:01:41.251Z",
          votes: 2,
        });
      });
  });

  test("if an attempt is made to update votes to an review id that does not exist, respond with an error", () => {
    return request(app)
      .get("/api/reviews/1400")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Path not found");
      });
  });
});
