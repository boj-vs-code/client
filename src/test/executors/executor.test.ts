import * as assert from "assert";
import { Executor } from "../../executors";

suite("Executor test code with input, output", () => {
  suite("Executor#python", () => {
    test("should be failed", () => {
      const executor = new Executor('', 'python $BOJ_SOURCE_FILE');
      const result = executor.test(__dirname + '/../fixtures/solutions/solve.py', ['2\n', '1\n']);
      assert.deepStrictEqual(result, [false, '2\n', '1\n', '2\n']);
    });

    test("should be success", () => {
      const executor = new Executor('', 'python $BOJ_SOURCE_FILE');
      const result = executor.test(__dirname + '/../fixtures/solutions/solve.py', ['1\n', '1\n']);
      assert.deepStrictEqual(result, [true, '', '', '']);
    });
  });
});
