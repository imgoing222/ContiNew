const nextJest = require("next/jest");

const createJestConfig = nextJest({
	dir: "./",
});

const customJestConfig = {
	setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
	moduleDirectories: ["node_modules", "<rootDir>/"],
	testEnvironment: "jest-environment-jsdom",
	moduleNameMapper: {
		"@components/(.*)": "<rootDir>/src/components/$1",
		"@styles/(.*)": "<rootDir>/src/styles/$1",
		"@hooks/(.*)": "<rootDir>/src/hooks/$1",
		"@utils/(.*)": "<rootDir>/src/utils/$1",
	},
};

module.exports = createJestConfig(customJestConfig);
