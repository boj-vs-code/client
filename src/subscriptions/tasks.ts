import * as vscode from "vscode";
import { SubmitTasksView } from "../views/tasks";

const showSubmitTasksSubscription = vscode.commands.registerCommand(
  "extension.showSubmitTasks",
  () => {
    SubmitTasksView.show();
  }
);

export { showSubmitTasksSubscription };
