import {
  createFailResult,
  createPassResult,
  TestReporter,
} from "./reporter/Reporter";

export type TestRunner = {
  run(testCases: Array<TestCase>): Promise<void>;
};
export type TestCase = {
  description: string;
  test: () => void | Promise<void>;
};

export function createTestRunner(reporter: TestReporter): TestRunner {
  return {
    async run(testCases: Array<TestCase>) {
      const allPromises = testCases.map(async (testCase) => {
        return runTestCase(testCase)
          .then(() => {
            reporter.report(createPassResult(testCase.description));
          })
          .catch((err) => {
            reporter.report(createFailResult(testCase.description, err));
          });
      });

      await Promise.all(allPromises);
    },
  };
}

async function runTestCase(testCase: TestCase): Promise<void> {
  try {
    await testCase.test();
  } catch (ex) {
    return Promise.reject(ex);
  }
}
