import * as vscode from "vscode";

export function createDefaultView() {
  const panel = vscode.window.createWebviewPanel(
    "whatType",
    "BOJ-vs-code",
    vscode.ViewColumn.Active
  );
}
