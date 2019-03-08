import * as assert from "assert";
import BOJ from "../../../api/boj";

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
