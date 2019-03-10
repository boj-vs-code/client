import * as vscode from "vscode";
import { submitBOJ } from "../lib/submit";

const submitSubscription = vscode.commands.registerCommand(
  "extension.submitBOJ",
  () => {
    submitBOJ();
  }
);

export { submitSubscription };
