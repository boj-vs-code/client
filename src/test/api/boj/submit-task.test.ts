import * as assert from "assert";
import { SubmitTaskManager } from "../../../api/boj/managers/submit-task";

suite("BOJ API TEST at api/boj/taskss", () => {
  suite("SubmitTaskManager#tasks", () => {
    test("1, 2, 3 => 3, 2, 1 // when limit is 3", () => {
      const testElements = [1, 2, 3];
      testElements.forEach(el =>
        SubmitTaskManager.getInstance().createTask(`${el}`, el)
      );
      const tasks = SubmitTaskManager.getInstance().tasks;
      assert.equal(tasks.length, testElements.length);
      testElements
        .reverse()
        .forEach((el, index) => assert.equal(tasks[index][0], el));
    });

    test("1, 2, 3, 4, 5 => 5, 4, 3 // when limit is 3", () => {
      SubmitTaskManager.getInstance().clear();

      const testElements = [1, 2, 3, 4, 5];
      testElements.forEach(el => {
        SubmitTaskManager.getInstance().createTask(el.toString(), el);
      });
      const tasks = SubmitTaskManager.getInstance().tasks;
      assert.equal(tasks.length, 3);
      testElements
        .slice(-3)
        .reverse()
        .forEach((el, index) => {
          assert.equal(tasks[index][0], el);
        });
    });
  });
});
