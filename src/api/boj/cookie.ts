import Axios from "axios";

export class Cookie {
  constructor(public name: string, public value: string) {}
  toString = (): string => `${this.name}=${this.value};`;

  public static async getBOJSessionCookie(): Promise<Cookie> {
    return await Axios.get("https://www.acmicpc.net/").then(resp => {
      let cookies: Array<Cookie> = resp.headers["set-cookie"]
        .map((x: string) => x.split(";")[0].split("="))
        .map((x: Array<string>) => new Cookie(x[0], x[1]));

      return cookies.filter(x => x.name === "OnlineJudge")[0];
    });
  }
}
