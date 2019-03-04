import Axios from "axios";
import { parse, HTMLElement } from "node-html-parser";
import * as qs from "querystring";
import { LanguageInfo } from "../../lib";
import * as vscode from "vscode";

import { Problem } from "./problem";
import { TestCase } from "./testcase";
import { Cookie } from "./cookie";
import { IJudgeSiteSession } from "./interfaces/judge-site-session";
import { Config } from "./config";
import { IBOJConfig } from "./interfaces/boj-config";
import { SessionInitilaizer } from "./session";

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

      const input = inputElement.text.trim().replace(/\r\n/g, "\n");
      const output = outputElement.text.trim().replace(/\r\n/g, "\n");

      testcases.push(new TestCase(input, output));
    }

    const title = root.querySelector("#problem_title").text.trim();
    const description = root.querySelector("#problem_description").text.trim();
    const inputDescription = root.querySelector("#problem_input").text.trim();
    const outputDescription = root.querySelector("#problem_output").text.trim();
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
  public config: IBOJConfig = Config.getBOJConfigFromFile();

  constructor() {
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

  public async submit(problem: number, language: LanguageInfo, source: string) {
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
      `Start to submit! / Problem Number: ${problem} / Language: ${
        language.language
      }`
    );

    Axios({
      method: "post",
      url: `https://www.acmicpc.net/submit/${problem}`,
      data: data,
      headers: headers
    }).then(resp => {
      vscode.window.showInformationMessage("End of submit!");
    });
  }
}
