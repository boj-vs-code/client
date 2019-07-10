import { ViewManager, BaseView } from ".";
import { ProblemManager } from "../api/boj/managers/problem";
import { log } from "util";

export class ProblemView extends BaseView {
  public VIEW_NAME = "PROBLEM_VIEW";

  public show(): void {
    const problem = ProblemManager.getInstance().recent;
    if (undefined === problem) {
      ViewManager.panel.title = "아무런 문제도 없습니다";
    } else {
      ViewManager.panel.title = problem.title;
    }
  }

  public render(): void {
    const problem = ProblemManager.getInstance().recent;

    if (undefined === problem) {
      ViewManager.panel.webview.html = `
      지금 바로 해보세요!
      `;
      return;
    }

    const isOdd = (x: number) => x % 2;

    const testcases = problem.testcases
      .map(
        (value, index) =>
          `<h3>${isOdd(index) ? "출력" : "입력"} ${Math.floor(
            index / 2
          )}</h3><pre>${value}</pre>`
      )
      .reduce((a, b) => a + b);

    log(JSON.stringify(problem.description.split("\n")));

    const convertHtml = (s: string) =>
      s
        .split("\n")
        .map(x => (x === "" ? "" : `<p>${x}</p>`))
        .reduce((prev, next) => prev + next, "");

    const style = `
    p {
      margin: 0 0 10px;
      font-size: medium;
      line-height: 30px;
    }`;

    ViewManager.panel.webview.html = `
    <style>
      ${style}
    </style>

    <h1>${problem.title}</h1>
    <h2>문제</h2>
    ${convertHtml(problem.description)}
    <h2>입력</h2>
    ${convertHtml(problem.inputDescription)}
    <h2>출력</h2>
    ${convertHtml(problem.outputDescription)}
    <h2>테스트 케이스</h2>
    ${testcases}
  `;
  }
}
