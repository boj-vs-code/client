import * as vscode from "vscode";
import { showLandingView } from "./views/loading";
import { submitSubscription } from "./subscriptions/submit";
import { showProblemInformationSubscription } from "./subscriptions/problem";

export function activate(context: vscode.ExtensionContext) {
  showLandingView();

  context.subscriptions.push(submitSubscription);
  context.subscriptions.push(showProblemInformationSubscription);
}

export function deactivate() {}
