import * as vscode from "vscode";
import { submitSubscription } from "./subscriptions/submit";
import { showProblemInformationSubscription } from "./subscriptions/problem";
import { showSubmitTasksSubscription } from "./subscriptions/tasks";
import { ViewManager } from "./views";

export function activate(context: vscode.ExtensionContext) {
  ViewManager.show("WELCOME_VIEW");

  context.subscriptions.push(submitSubscription);
  context.subscriptions.push(showProblemInformationSubscription);
  context.subscriptions.push(showSubmitTasksSubscription);
}

export function deactivate() {}
