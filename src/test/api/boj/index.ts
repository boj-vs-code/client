//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import * as assert from "assert";
import BOJ from "../../../api/boj";

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
// import * as vscode from 'vscode';
// import * as myExtension from '../extension';

// Defines a Mocha test suite to group tests of similar kind together
suite("BOJ API Tests", function() {
  // Defines a Mocha unit test
  test("BOJ#getProblem (1000)", async () => {
    const { title } = await BOJ.getProblem(1000);
    assert.equal(title, "A+B");
  });

  test("BOJ#getProblem (1001)", async () => {
    const { title } = await BOJ.getProblem(1001);
    assert.equal(title, "A-B");
  });
});
