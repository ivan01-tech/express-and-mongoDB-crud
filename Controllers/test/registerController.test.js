const { app, serverClose } = require("../../app.js")
require("dotenv").config();
const mongoose = require("mongoose");
const request = require("supertest");

jest.setTimeout(20000)

jest.mock("bcrypt").fn({
	hash: jest.fn(async (password, salt) => "object")
})

afterEach(async () => {
	await serverClose().close();
});

/* beforeEach(async () => {
	await mongoose.connect(process.env.DATABASE_URL);
});

 Closing database connection after each test. 
afterEach(async () => {
	await mongoose.connection.close();
}); */

describe("registerController unique test suite", function () {

	it("should pass", async function () {
		console.log("bcrypt : ", await require("bcrypt").hash("sdfzer", 10));
		expect(true).toBe(true)
	})

})
