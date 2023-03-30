module.exports = {
  testEnvironment: "node",
  transform: { "^.+\\.js$": "babel-jest" },
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  moduleFileExtensions: ["js", "json"],
  testMatch: ["<rootDir>/test/**/*.test.js"],
  verbose: true,
};
