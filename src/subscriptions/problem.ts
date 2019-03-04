import * as vscode from "vscode";
import { getProblemNumber } from "../lib";
import BOJ from "../api/boj";
import { showProblemWithWebview } from "../views/problem";

const showProblemInformationSubscription = vscode.commands.registerCommand(
  "extension.showProblemInformation",
  async () => {
    const problem = await BOJ.getProblem(getProblemNumber());
    showProblemWithWebview(problem);
  }
);

export { showProblemInformationSubscription };
