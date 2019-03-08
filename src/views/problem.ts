import * as vscode from "vscode";
import { extensionSession } from "../session";
import { Problem } from "../api/boj/problem";
import { createAndStoreViewIfNotExists } from ".";

const PROBLEM_VIEW = "problemView";

export function showProblemWithWebview(problem: Problem) {
  createAndStoreViewIfNotExists();

  const panel = <vscode.WebviewPanel>extensionSession.get(PROBLEM_VIEW);
  panel.title = problem.title;

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
