import * as assert from "assert";
import { Config } from "../../../api/boj/config";

suite("BOJ API TEST at api/boj/cookie", function() {
  suite("Config#getBOJConfigFromFile", () => {
    test("it will return config json has 'test', 'test'", () => {
      const config = Config.getBOJConfigFromFile("resources/.bojconfig");
      assert.equal(config.id, "test");
      assert.equal(config.password, "test");
    });
  });
});
