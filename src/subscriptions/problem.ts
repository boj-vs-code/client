import * as vscode from "vscode";
import { getProblemNumber } from "../lib";
import BOJ from "../api/boj";
import { ProblemView } from "../views/problem";

const showProblemInformationSubscription = vscode.commands.registerCommand(
  "extension.showProblemInformation",
  async () => {
    const problem = await BOJ.getProblem(getProblemNumber());
    ProblemView.show(problem);
  }
);

export { showProblemInformationSubscription };
