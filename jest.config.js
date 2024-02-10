module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    moduleNameMapper: {
        "^@/scripts/(.*)$": "<rootDir>/src/scripts/$1"
    },
};
