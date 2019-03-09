import * as vscode from "vscode";
import { showSubmitTasksView } from "../views/tasks";

const showSubmitTasksSubscription = vscode.commands.registerCommand(
  "extension.showSubmitTasks",
  () => {
    showSubmitTasksView();
  }
);

export { showSubmitTasksSubscription };
