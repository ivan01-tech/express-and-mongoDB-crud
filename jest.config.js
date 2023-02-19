/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  verbose: true,
  testEnvironment: "node",
  testMatch: ["**/test/**/*.test.js"],
  moduleFileExtensions: ["js"],
  transform: { "\\.[jt]sx?$": "ts-jest" },
  forceExit: true,
  preset: "ts-jest",
  // clearMocks: true
};
