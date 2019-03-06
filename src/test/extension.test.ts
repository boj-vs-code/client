//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import * as assert from "assert";
import BOJ from "../api/boj";
import { Problem } from "../api/boj/problem";
import { TestCase } from "../api/boj/testcase";

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
// import * as vscode from 'vscode';
// import * as myExtension from '../extension';

// Defines a Mocha test suite to group tests of similar kind together
suite("BOJ API Tests", function() {
  // Defines a Mocha unit test
  test("Get problem 1000", async () => {
    const problem1000 = new Problem(
      "A+B",
      "두 정수 A와 B를 입력받은 다음, A+B를 출력하는 프로그램을 작성하시오.",
      "첫째 줄에 A와 B가 주어진다. (0 < A, B < 10)",
      "첫째 줄에 A+B를 출력한다.",
      [new TestCase("1 2", "3")],
      {
        answerPercent: "45.824%",
        memoryLimit: "128 MB",
        submitCount: "173806",
        successCount: "76937",
        successPeopleCount: "57167",
        timeLimit: "2 초"
      }
    );
    const parsedProblem = await BOJ.getProblem(1000);

    assert.equal(parsedProblem, problem1000);
  });
});
