import * as assert from "assert";
import BOJ from "../../../api/boj";
import { Cookie } from "../../../api/boj/cookie";

const loop = (range: number) => Array.from(Array(range).keys());

suite("BOJ API TEST at api/boj/cookie", () => {
  suite("Cookie#getBOJSessionCookie", () => {
    loop(10).forEach(x => {
      test(`Iterative test #${x + 1}`, async () => {
        const cookie = await Cookie.getBOJSessionCookie();
        assert.equal(cookie.name, "OnlineJudge");
        assert.ok(/^[a-z0-9]{26}$/.test(cookie.value));
      });
    });
  });

  suite("Cookie#toString", () => {
    const testcases = [
      [["PHPSESSID", "Ilovephp"], "PHPSESSID=Ilovephp;"],
      [["ARRAffinity", "somevalue"], "ARRAffinity=somevalue;"]
    ];

    testcases.forEach(([[name, value], expected]) => {
      test(`('${name}, ${value}') => ${expected}`, () => {
        const cookie = new Cookie(name, value);
        assert.equal(cookie.toString(), expected);
      });
    });
  });
});
