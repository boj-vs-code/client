import * as vscode from "vscode";
import { getProblemNumber } from "../lib";
import BOJ from "../api/boj";
import { ProblemView } from "../views/problem";
import { ViewManager } from "../views";

const showProblemInformationSubscription = vscode.commands.registerCommand(
  "extension.showProblemInformation",
  async () => {
    const problem = await BOJ.getProblem(getProblemNumber());
    ViewManager.show("PROBLEM_VIEW");
  }
);

export { showProblemInformationSubscription };
