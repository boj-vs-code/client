import { Problem } from "../problem";
import { ExecutorManager } from "../../../executors/manager";
import { Executor } from "../../../executors";

class Test {
  constructor(
    public problem: Problem,
    public languageName: string,
    public sourceFilePath: string,
  ) {}

  public test(): [boolean, string, string, string] {
    const executor = <Executor>ExecutorManager.get(this.languageName);
    return executor.test(this.sourceFilePath, this.problem.testcases);
  }
}

export class TestManager {
  private static instance: TestManager;
  public tests = new Array<Test>();
  public testResults: Array<[boolean, string, string, string]> = new Array();

  public limit = 1;

  private constructor() {}

  static getInstance(): TestManager {
    return this.instance || (this.instance = new TestManager());
  }

  createTest(problem: Problem, languageName: string, sourceFilePath: string) {
    if (this.tests.length >= this.limit) {
      this.tests.pop();
      this.testResults.pop();
    }
    const test = new Test(problem, languageName, sourceFilePath);
    this.tests.unshift(test);
    this.testResults.unshift(test.test());
  }

  clear() {
    this.tests = [];
    this.testResults = [];
  }
}
