import { createTestRunner } from "./TestRunner";
import { createConsoleReporter } from "./reporter/ConsoleReporter";

const reporter = createConsoleReporter();

const testRunner = createTestRunner(reporter);

testRunner.run([
  {
    description: "pass",
    test: () => {
      /*it passes*/
    },
  },
  {
    description: "fail",
    test: () => {
      throw new Error("it fails");
    },
  },
]);
