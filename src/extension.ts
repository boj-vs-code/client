import * as vscode from "vscode";

import { ViewManager } from "./views";
import { WelcomeView } from "./views/welcome";
import { ProblemView } from "./views/problem";
import { SubmitTasksView } from "./views/tasks";

import { submitSubscription } from "./subscriptions/submit";
import { showSubmitTasksSubscription } from "./subscriptions/tasks";
import { showProblemInformationSubscription } from "./subscriptions/problem";

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
