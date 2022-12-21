import { createConsoleReporter } from "./reporter/ConsoleReporter";
import { createTestRunner } from "./TestRunner";
import { UseCase } from "./use_cases/UseCase";

type Action = {
  kind: "do_nothing";
};
type Validation = {
  kind: "see_nothing";
};

const actioner: (action: Action) => void = (action) => {
  // we did it, yay!
};
const validator: (validation: Validation) => void = (v) => {
  // we did it, yay!
};

const useCases: Array<UseCase<Action, Validation>> = [
  {
    description: "test one",
    Given: () => {},
    When: { kind: "do_nothing" },
    Then: [{ kind: "see_nothing" }],
  },
];

const reporter = createConsoleReporter();

const testRunner = createTestRunner(reporter, actioner, validator);

testRunner.run(useCases);
