module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  globals: {
    'ts-jest': {
      tsConfig: {
        esModuleInterop: true
      }
    }
  },
  setupFiles: ["./src/setupTests.ts"],
  snapshotSerializers: ["enzyme-to-json/serializer"]
};
