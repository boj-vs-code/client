import * as vscode from "vscode";

import { ViewManager } from "../views";

const showSubmitTasksSubscription = vscode.commands.registerCommand(
  "extension.showSubmitTasks",
  () => {
    ViewManager.show("SUBMIT_TASK_VIEW");
  }
);

export { showSubmitTasksSubscription };
