import * as vscode from "vscode";
import { submitBOJ } from "../submit";

const submitSubscription = vscode.commands.registerCommand(
  "extension.submitBOJ",
  () => {
    submitBOJ();
  }
);

export { submitSubscription };
