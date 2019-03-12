import * as vscode from "vscode";
import { LandingView } from "./views/landing";
import { submitSubscription } from "./subscriptions/submit";
import { showProblemInformationSubscription } from "./subscriptions/problem";
import { showSubmitTasksSubscription } from "./subscriptions/tasks";

export function activate(context: vscode.ExtensionContext) {
  LandingView.getInstance().show();

  context.subscriptions.push(submitSubscription);
  context.subscriptions.push(showProblemInformationSubscription);
  context.subscriptions.push(showSubmitTasksSubscription);
}

export function deactivate() {}
