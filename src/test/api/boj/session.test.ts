import * as assert from "assert";
import { BOJSession } from "../../../api/boj";
import { writeFileSync } from "fs";

suite("api/boj/session test", () => {
  test("SessionInitilaizer#initializeBOJSession", () => {
    const session: BOJSession = new BOJSession("resources/.bojconfig");
    assert.equal(session.config.id, "test");
    assert.equal(session.config.password, "test");
  });
});
