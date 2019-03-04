import * as vscode from "vscode";
import { extensionSession } from "../extension/session";

export function createDefaultView(): vscode.WebviewPanel {
  const panel = vscode.window.createWebviewPanel(
    "whatType",
    "BOJ-vs-code",
    vscode.ViewColumn.Active
  );

  panel.onDidDispose(() => {
    extensionSession.delete("informationView");
  });

  return panel;
}
