import {
  createFailResult,
  createPassResult,
  TestReporter,
} from "./reporter/Reporter";
import { UseCase } from "./use_cases/UseCase";

export type TestRunner<Action, Validation> = {
  run(useCases: Array<UseCase<Action, Validation>>): void;
};

export function createTestRunner<Action, Validation>(
  reporter: TestReporter,
  userActionExecutor: (action: Action) => void,
  stateValidationExecutor: (validation: Validation) => void
): TestRunner<Action, Validation> {
  return {
    run(useCases: Array<UseCase<Action, Validation>>) {
      useCases.forEach((useCase) => {
        try {
          useCase.Given();

          userActionExecutor(useCase.When);

          useCase.Then.forEach((validation) =>
            stateValidationExecutor(validation)
          );

          reporter.report(createPassResult(useCase.description));
        } catch (ex) {
          reporter.report(createFailResult(useCase.description, ex));
        }
      });
    },
  };
}
