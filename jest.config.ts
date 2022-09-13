import nextJest from "next/jest";
// Sync object
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ["@testing-library/jest-dom"], // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ["node_modules", "<rootDir>/test/"],
  testEnvironment: "jsdom",
  modulePathIgnorePatterns: ["cypress"],
  moduleNameMapper: {
    "@/core/(.*)": "<rootDir>/src/core/$1",
    "@/modules/(.*)": "<rootDir>/src/modules/$1",
    "@/test/(.*)": "<rootDir>/test/$1",
  },
};

module.exports = createJestConfig(customJestConfig);
