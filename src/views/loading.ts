import * as vscode from "vscode";
import { extensionSession } from "../session";

export function showLandingView(): void {
  const panel = vscode.window.createWebviewPanel(
    "boj-vs-code-view",
    "BOJ-vs-code",
    vscode.ViewColumn.Active
  );

  panel.webview.html = `
    <h1>Hello!!! welcome to boj-vs-code!!</h1>
  `;

  panel.onDidDispose(() => {
    extensionSession.delete("informationView");
  });
}
