import * as vscode from "vscode";

import { ViewManager } from "../views";

const showSubmitTasksSubscription = vscode.commands.registerCommand(
  "bojvscode.showSubmitTasks",
  () => {
    ViewManager.show("SUBMIT_TASK_VIEW");
  }
);

export { showSubmitTasksSubscription };
