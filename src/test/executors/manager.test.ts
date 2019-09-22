import * as assert from "assert";
import { ExecutorManager } from "../../executors/manager";
import { Executor } from "../../executors";

suite("ExecutorManager", () => {
  const testcases = [
    ["Python 2", "solve.py"],
    ["Python 3", "solve.py"],
    ["C", "solve.c"]
  ];

  testcases.forEach(([languageName, sourceFile]) => {
    suite(languageName, () => {
      test("should be failed", () => {
        const executor = <Executor>ExecutorManager.get(languageName);
        const result = executor.test(__dirname + `/../fixtures/solutions/${sourceFile}`, ['2\n', '1\n']);
        assert.deepStrictEqual(result, [false, '2\n', '1\n', '2\n']);
      });
  
      test("should be success", () => {
        const executor = <Executor>ExecutorManager.get(languageName);
        const result = executor.test(__dirname + `/../fixtures/solutions/${sourceFile}`, ['1\n', '1\n']);
        assert.deepStrictEqual(result, [true, '', '', '']);
      });
    });
  });
});
