import * as assert from "assert";
import { ExecutorManager } from "../../executors/manager";

suite("ExecutorManager", () => {
  suite("Python 2", () => {
    test("should be failed", () => {
      const executor = ExecutorManager.get('Python 2');
      if (executor === undefined) {
          return;
      }
      const result = executor.test(__dirname + '/../fixtures/solutions/solve.py', ['2\n', '1\n']);
      assert.deepStrictEqual(result, [false, '2\n', '1\n', '2\n']);
    });

    test("should be success", () => {
      const executor = ExecutorManager.get('Python 2');
      if (executor === undefined) {
          return;
      }
      const result = executor.test(__dirname + '/../fixtures/solutions/solve.py', ['1\n', '1\n']);
      assert.deepStrictEqual(result, [true, '', '', '']);
    });
  });
});
