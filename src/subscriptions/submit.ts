import * as vscode from "vscode";
import { submitBOJ } from "../submit";
import { bojSession } from "../session";

const submitSubscription = vscode.commands.registerCommand(
  "extension.submitBOJ",
  () => {
    submitBOJ(bojSession);
  }
);

export { submitSubscription };
