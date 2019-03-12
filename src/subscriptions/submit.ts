import * as vscode from "vscode";
import { submitBOJ } from "../lib/submit";
import { log } from "util";

const submitSubscription = vscode.commands.registerCommand(
  "extension.submitBOJ",
  () => {
    submitBOJ().catch(() => {
      log("Timeout.. ㅠ");
    });
  }
);

export { submitSubscription };
