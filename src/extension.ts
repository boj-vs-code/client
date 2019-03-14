import * as vscode from "vscode";
import { submitSubscription } from "./subscriptions/submit";
import { showProblemInformationSubscription } from "./subscriptions/problem";
import { showSubmitTasksSubscription } from "./subscriptions/tasks";
import { ViewManager } from "./views";
import { SubmitTasksView } from "./views/tasks";
import { WelcomeView } from "./views/welcome";
import { ProblemView } from "./views/problem";

export function activate(context: vscode.ExtensionContext) {
  ViewManager.registerView(new WelcomeView());
  ViewManager.registerView(new ProblemView());
  ViewManager.registerView(new SubmitTasksView());

  ViewManager.show("WELCOME_VIEW");

  context.subscriptions.push(submitSubscription);
  context.subscriptions.push(showProblemInformationSubscription);
  context.subscriptions.push(showSubmitTasksSubscription);
}

export function deactivate() {}
