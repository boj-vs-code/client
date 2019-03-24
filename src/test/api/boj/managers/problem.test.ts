import * as assert from "assert";
import { ProblemManager } from "../../../../api/boj/managers/problem";
import { Problem } from "../../../../api/boj/problem";

suite("BOJ API TEST at api/boj/managers/problem", () => {
  suite("ProblemManager#recent", () => {
    test("when first, will return undefined", () => {
      assert.equal(undefined, ProblemManager.getInstance().recent);
    });

    test("after getting problem, recent will return the problem instance", async () => {
      await ProblemManager.getInstance().getProblem(1000);
      assert.equal((<Problem>ProblemManager.getInstance().recent).title, "A+B");
    });
  });

  suite("ProblemManager#getProblem", () => {
    test("(1000)", async () => {
      const expected = {
        title: "A+B",
        description:
          "두 정수 A와 B를 입력받은 다음, A+B를 출력하는 프로그램을 작성하시오.",
        inputDescription: "첫째 줄에 A와 B가 주어진다. (0 < A, B < 10)",
        outputDescription: "첫째 줄에 A+B를 출력한다."
      } as Problem;

      const actual = <Problem>(
        await ProblemManager.getInstance().getProblem(1000)
      );

      assert.equal(actual.title, expected.title);
      assert.equal(actual.description, expected.description);
      assert.equal(actual.inputDescription, expected.inputDescription);
      assert.equal(actual.outputDescription, expected.outputDescription);
    });

    test("(1001)", async () => {
      const expected = {
        title: "A-B",
        description:
          "두 정수 A와 B를 입력받은 다음, A-B를 출력하는 프로그램을 작성하시오.",
        inputDescription: "첫째 줄에 A와 B가 주어진다. (0 < A, B < 10)",
        outputDescription: "첫째 줄에 A-B를 출력한다."
      } as Problem;

      const actual = <Problem>(
        await ProblemManager.getInstance().getProblem(1001)
      );

      assert.equal(actual.title, expected.title);
      assert.equal(actual.description, expected.description);
      assert.equal(actual.inputDescription, expected.inputDescription);
      assert.equal(actual.outputDescription, expected.outputDescription);
    });
  });
});
