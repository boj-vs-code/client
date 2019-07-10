import * as vscode from "vscode";

import { log } from "util";
import { submitBOJ } from "../lib/submit";

const submitSubscription = vscode.commands.registerCommand(
  "extension.submitBOJ",
  () => {
    submitBOJ().catch(() => {
      log("Timeout.. ㅠ");
    });
  }
);

export { submitSubscription };
