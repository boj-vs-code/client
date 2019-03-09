import { extensionSession } from "../session";
import * as vscode from "vscode";

const BOJ_VIEW = "bojView";

function createAndStoreViewIfNotExists() {
  if (!extensionSession.has(BOJ_VIEW)) {
    const panel = vscode.window.createWebviewPanel(
      "boj-vs-code-view",
      "",
      vscode.ViewColumn.Eight,
      {}
    );

    panel.onDidDispose(() => {
      extensionSession.delete(BOJ_VIEW);
    });

    extensionSession.set(BOJ_VIEW, panel);
  }
}

const ViewManager = {
  get main() {
    createAndStoreViewIfNotExists();
    return <vscode.WebviewPanel>extensionSession.get(BOJ_VIEW);
  }
};

export { ViewManager };
