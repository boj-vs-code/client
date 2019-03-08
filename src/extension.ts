import * as vscode from "vscode";
import { showLandingView } from "./views/landing";
import { submitSubscription } from "./subscriptions/submit";
import { showProblemInformationSubscription } from "./subscriptions/problem";
import { DepNodeProvider } from "./providers/tree/submit-tasks";

export function activate(context: vscode.ExtensionContext) {
  showLandingView();

  context.subscriptions.push(submitSubscription);
  context.subscriptions.push(showProblemInformationSubscription);

  const provider = new DepNodeProvider();
  vscode.window.registerTreeDataProvider("bojSubmitTasksExplorer", provider);
}

export function deactivate() {}
