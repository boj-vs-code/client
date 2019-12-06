import Axios from "axios";
import * as qs from "querystring";
import * as vscode from "vscode";
import { parse, HTMLElement } from "node-html-parser";

import { LanguageInfo } from "../../lib";

import { SessionInitilaizer } from "./session";
import { Cookie } from "./cookie";
import { Config } from "./config";
import { IBOJConfig } from "./interfaces/boj-config";
import { IJudgeSiteSession } from "./interfaces/judge-site-session";
import { IBOJScoringStatus } from "./interfaces/boj-scoring-status";
import { ProblemManager } from "./managers/problem";

export default class BOJ {
  static getProblem(problemNumber: number) {
    return ProblemManager.getInstance().getProblem(problemNumber);
  }
}
export class BOJSession implements IJudgeSiteSession {
  public sessionId: Cookie = new Cookie("OnlineJudge", "unknown");
  public config?: IBOJConfig;
  private initialized: boolean = false;

  public loadConfigFromFile(configFilename: string = ".bojconfig") {
    this.config = Config.getBOJConfigFromFile(configFilename);
  }

  public initialize() {
    if (this.config === null) {
      this.loadConfigFromFile();
    }
    SessionInitilaizer.initializeBOJSession(this).then(() => {
      this.initialized = true;
    });
  }

  public async signin() {
    if (this.config === null || this.config === undefined) {
      this.loadConfigFromFile();
    }

    // this condition is useless, but tsc made me do it. ㅡ.ㅡ
    if (this.config === undefined) {
      return;
    }

    const data = qs.stringify({
      login_user_id: this.config.id,
      login_password: this.config.password
    });

    const headers = {
      Cookie: this.sessionId.toString()
    };

    while (!this.initialized) {}

    await Axios({
      method: "post",
      url: "https://www.acmicpc.net/signin",
      data: data,
      headers: headers
    });
  }

  private async getCsrfKey(problem: number): Promise<string> {
    const resp = await Axios({
      method: "get",
      url: `https://www.acmicpc.net/submit/${problem}`,
      headers: {
        Cookie: this.sessionId.toString()
      }
    });

    const root: HTMLElement = <HTMLElement>parse(resp.data);
    const csrfKeyElement = <HTMLElement>(
      root.querySelector("#submit_form").childNodes[5]
    );

    return csrfKeyElement.rawAttributes.value;
  }

  public async submit(
    problem: number,
    language: LanguageInfo,
    source: string
  ): Promise<string> {
    await this.signin();

    const csrf_key = await this.getCsrfKey(problem);

    const data = qs.stringify({
      source: source,
      language: language.number,
      problem_id: problem,
      csrf_key: csrf_key,
      code_open: "open"
    });

    const headers = {
      Cookie: this.sessionId.toString()
    };

    const submitNoticeMessage = `Submit을 시작합니다! / 문제번호: ${problem} / 선택한 언어: ${
      language.name
    }`;

    vscode.window.showInformationMessage(submitNoticeMessage);

    const resp = await Axios({
      method: "post",
      url: `https://www.acmicpc.net/submit/${problem}`,
      data: data,
      headers: headers
    });

    const content: string = resp.data;
    const matches = content.match(/(?<=watch_solution\()\d+/g);

    if (matches !== null) {
      return matches[0];
    } else {
      return ""; // TODO: throw custom Error, not default value
    }
  }

  public async solved(solution_id: string): Promise<IBOJScoringStatus> {
    const data = qs.stringify({
      solution_id
    });

    const headers = {
      "X-Requested-With": "XMLHttpRequest"
    };

    const resp = await Axios({
      method: "post",
      url: `https://www.acmicpc.net/status/ajax`,
      data: data,
      headers: headers
    });

    return resp.data;
  }
}
