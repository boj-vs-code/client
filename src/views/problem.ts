import { ViewManager, BaseView } from ".";
import { ProblemManager } from "../api/boj/managers/problem";

export class ProblemView extends BaseView {
  public VIEW_NAME = "PROBLEM_VIEW";

  public show(): void {
    ViewManager.panel.title = ProblemManager.getInstance().recent.title;
    ViewManager.panel.reveal();
  }

  public render(): void {
    const problem = ProblemManager.getInstance().recent;
    const testcases = problem.testcases
      .map(
        (value, index) =>
          `<h3>입력 ${index}</h3>${value.input}
           <h3>출력 ${index}</h3>${value.output}`
      )
      .reduce((a, b) => a + b);

    ViewManager.panel.webview.html = `
    <h1>${problem.title}</h1>
    <h2>문제</h2>
    ${problem.description}
    <h2>입력</h2>
    ${problem.inputDescription}
    <h2>출력</h2>
    ${problem.outputDescription}
    <h2>테스트 케이스</h2>
    ${testcases}
  `;
  }
}
