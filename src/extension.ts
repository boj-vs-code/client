import * as vscode from "vscode";
import { createDefaultView } from "./views/loading";
import { submitSubscription } from "./subscriptions/submit";
import { showProblemInformationSubscription } from "./subscriptions/problem";

export function activate(context: vscode.ExtensionContext) {
  createDefaultView();

  context.subscriptions.push(submitSubscription);
  context.subscriptions.push(showProblemInformationSubscription);
}

export function deactivate() {}
