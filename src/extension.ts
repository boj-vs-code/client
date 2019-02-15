// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { submitBOJ } from "./submit";
import BOJ, { BOJSession } from "./api/boj";
import { getProblemNumber } from "./lib";
import { showProblemWithWebview } from "./problemView";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be e	xecuted once when your extension is activated
  console.log(
    'Congratulations, your extension "boj-vs-code-ts" is now active!'
  );
  const session = new BOJSession();
  vscode.window.showInformationMessage("Activate!");

  let showProblemInformationSubscription = vscode.commands.registerCommand(
    "extension.showProblemInformation",
    async () => {
      const problem = await BOJ.getProblem(getProblemNumber());
      showProblemWithWebview(problem);
    }
  );

  let submitSubscription = vscode.commands.registerCommand(
    "extension.submitBOJ",
    () => {
      submitBOJ(session);
    }
  );

  context.subscriptions.push(submitSubscription);
  context.subscriptions.push(showProblemInformationSubscription);
}

// this method is called when your extension is deactivated
export function deactivate() {}
