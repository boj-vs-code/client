import * as assert from "assert";
import { BOJSession } from "../../../api/boj";

suite("BOJ API TEST at api/boj/session", () => {
  test("SessionInitilaizer#initializeBOJSession", async () => {
    const session: BOJSession = new BOJSession("resources/.bojconfig");
    await session.initialize(); // alias of SessionInitilaizer#initializeBOJSession
    assert.notEqual(session.sessionId, "unknown");
  });
});
