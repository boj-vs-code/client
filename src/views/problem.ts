import * as vscode from "vscode";
import { Problem } from "../api/boj";
import { extensionSession } from "../extension/session";

const PROBLEM_VIEW = "problemView";

export function showProblemWithWebview(problem: Problem) {
  if (!extensionSession.has(PROBLEM_VIEW)) {
    const panel = vscode.window.createWebviewPanel(
      "bojProblemView",
      problem.title,
      vscode.ViewColumn.Seven,
      {}
    );

    panel.onDidDispose(() => {
      vscode.window.showErrorMessage("Disposed");

      extensionSession.delete(PROBLEM_VIEW);
    });

    extensionSession.set(PROBLEM_VIEW, panel);
  }

  const panel = <vscode.WebviewPanel>extensionSession.get(PROBLEM_VIEW);
  panel.title = problem.title;

  const editor = vscode.window.activeTextEditor;

  const testcases = problem.testcases.map(
    (value, index) =>
      `<h3>입력 ${index}</h3>${value.input}
       <h3>출력 ${index}</h3>${value.output}`
  );

  panel.webview.html = `
      <!DOCTYPE html>
      <head></head>
      <body>
        <h1>${problem.title}</h1>
        <h2>문제</h2>
        ${problem.description}
        <h2>입력</h2>
        ${problem.inputDescription}
        <h2>출력</h2>
        ${problem.outputDescription}
        <h2>테스트 케이스</h2>
        ${testcases}
      </body>
    `;
}
