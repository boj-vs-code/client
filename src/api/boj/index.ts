import Axios from "axios";
import * as qs from "querystring";
import * as vscode from "vscode";
import { parse, HTMLElement } from "node-html-parser";

import { LanguageInfo } from "../../lib";

import { SessionInitilaizer } from "./session";
import { Problem } from "./problem";
import { TestCase } from "./testcase";
import { Cookie } from "./cookie";
import { Config } from "./config";
import { IBOJConfig } from "./interfaces/boj-config";
import { IJudgeSiteSession } from "./interfaces/judge-site-session";
import { IBOJScoringStatus } from "./interfaces/boj-scoring-status";

export default class BOJ {
  static session: BOJSession;
  static async getProblem(problemNumber: Number): Promise<Problem> {
    const resp = await Axios.get(
      `https://acmicpc.net/problem/${problemNumber}`
    );

    const options = {
      lowerCaseTagName: false,
      script: false,
      style: false,
      pre: true
    };

    const root: HTMLElement = <HTMLElement>parse(resp.data, options);
    const problemInfoElements = root.querySelector("#problem-info")
      .childNodes[3].childNodes[1].childNodes;

    const testcases: Array<TestCase> = new Array<TestCase>();

    for (let i = 1; i <= 10; ++i) {
      const inputElement = root.querySelector(`#sample-input-${i}`);
      const outputElement = root.querySelector(`#sample-output-${i}`);
      if (inputElement === null || outputElement === null) {
        break;
      }

      const input = `<pre>${inputElement.innerHTML
        .trim()
        .replace(/\r\n/g, "\n")}</pre>`;
      const output = `<pre>${outputElement.innerHTML
        .trim()
        .replace(/\r\n/g, "\n")}</pre>`;

      testcases.push(new TestCase(input, output));
    }

    const title = root.querySelector("#problem_title").innerHTML.trim();
    const description = root
      .querySelector("#problem_description")
      .innerHTML.trim();
    const inputDescription = root
      .querySelector("#problem_input")
      .innerHTML.trim();
    const outputDescription = root
      .querySelector("#problem_output")
      .innerHTML.trim();
    const [
      timeLimit,
      memoryLimit,
      submitCount,
      successCount,
      successPeopleCount,
      answerPercent
    ] = problemInfoElements
      .map(x => x.rawText)
      .filter(x => x.indexOf("\t") === -1);

    const metadata = {
      timeLimit,
      memoryLimit,
      submitCount,
      successCount,
      successPeopleCount,
      answerPercent
    };

    return new Problem(
      title,
      description,
      inputDescription,
      outputDescription,
      testcases,
      metadata
    );
  }
}

export class BOJSession implements IJudgeSiteSession {
  public sessionId: Cookie = new Cookie("OnlineJudge", "unknown");
  public config: IBOJConfig;

  constructor(configFilename: string = ".bojconfig") {
    this.config = Config.getBOJConfigFromFile(configFilename);
    SessionInitilaizer.initializeBOJSession(this);
  }

  public async signin() {
    while (this.sessionId.value === "unknown") {}

    const data = qs.stringify({
      login_user_id: this.config.id,
      login_password: this.config.password
    });

    const headers = {
      Cookie: this.sessionId.toString()
    };

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

    vscode.window.showInformationMessage(
      `Submit을 시작합니다! / 문제번호: ${problem} / 선택한 언어: ${
        language.language
      }`
    );

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
