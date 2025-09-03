export default {
  preset: "ts-jest",
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  // Disable coverage for now to avoid babel-plugin-istanbul
  collectCoverage: false,
  // Test file patterns
  testMatch: ["**/__tests__/**/*.ts", "**/?(*.)+(spec|test).ts"],
  // Ignore patterns
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  // Transform patterns
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
};
