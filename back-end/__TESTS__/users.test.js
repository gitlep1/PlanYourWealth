const request = require("supertest");
const app = require("../index");
const jwt = require("jsonwebtoken");
const { db, closeDb } = require("../db/dbConfig");

describe("User API Endpoints", () => {
  let token;

  beforeAll(async () => {
    token = jwt.sign({ user: { id: 1 } }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    await db.none("TRUNCATE users RESTART IDENTITY CASCADE");

    // await db.none(
    //   "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
    //   ["testuser", "test@example.com", "password123"]
    // );
  });

  test("GET /users - Get all users", async () => {
    const res = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${token}`);

    console.log("GET /users response:", res.body);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.payload)).toBeTruthy();
  });

  test("POST /users/signup - Create a new user", async () => {
    const res = await request(app).post("/users/signup").send({
      username: "testuser",
      email: "test@example.com",
      password: "password123",
    });

    console.log("POST /users/signup response:", res.body);

    expect(res.statusCode).toBe(200);
    expect(res.body.payload).toHaveProperty("username", "testuser");
    expect(res.body).toHaveProperty("token");
  });

  test("POST /users/signin - Sign in a user", async () => {
    const res = await request(app).post("/users/signin").send({
      email: "test@example.com",
      password: "password123",
    });

    console.log("POST /users/signin response:", res.body);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  test("PUT /users/user - Update user info", async () => {
    const res = await request(app)
      .put("/users/user")
      .set("Authorization", `Bearer ${token}`)
      .send({
        username: "updatedUser",
        email: "updated@example.com",
      });

    console.log("PUT /users/user response:", res.body);

    expect(res.statusCode).toBe(200);
    expect(res.body.payload).toHaveProperty("username", "updatedUser");
  });

  test("DELETE /users/user - Delete user", async () => {
    const res = await request(app)
      .delete("/users/user")
      .set("Authorization", `Bearer ${token}`);

    console.log("DELETE /users/user response:", res.body);

    expect(res.statusCode).toBe(200);
  });

  afterAll(() => {
    closeDb();
  });
});
