import Axios from "axios";
import { Cookie } from "./cookie";
import { BOJSession } from ".";

export class SessionInitilaizer {
  public static async initializeBOJSession(session: BOJSession) {
    Axios.get("https://www.acmicpc.net/").then(resp => {
      let cookies: Array<Cookie> = resp.headers["set-cookie"]
        .map((x: string) => x.split(";")[0].split("="))
        .map((x: Array<string>) => new Cookie(x[0], x[1]));

      session.sessionId = cookies.filter(x => x.name === "OnlineJudge")[0];
    });
  }
}
