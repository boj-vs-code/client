import { Problem } from "../api/boj/problem";
import { ViewManager } from ".";

const ProblemView = {
  show(problem: Problem) {
    const panel = ViewManager.main;
    panel.title = problem.title;

    this.render(problem);
  },

  render(problem: Problem) {
    const panel = ViewManager.main;

    const testcases = problem.testcases
      .map(
        (value, index) =>
          `<h3>입력 ${index}</h3>${value.input}
      <h3>출력 ${index}</h3>${value.output}`
      )
      .reduce((a, b) => a + b);

    panel.webview.html = `
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
};

export { ProblemView };
