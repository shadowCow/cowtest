import {
  createFailResult,
  createPassResult,
  TestReporter,
} from "./reporter/Reporter";

export type TestRunner = {
  run(testCases: Array<TestCase>): void;
};
export type TestCase = {
  description: string;
  test: () => void;
};

export function createTestRunner(reporter: TestReporter): TestRunner {
  return {
    run(testCases: Array<TestCase>) {
      testCases.forEach((testCase) => {
        try {
          testCase.test();

          reporter.report(createPassResult(testCase.description));
        } catch (ex) {
          reporter.report(createFailResult(testCase.description, ex));
        }
      });
    },
  };
}
