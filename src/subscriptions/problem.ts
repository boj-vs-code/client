import * as vscode from "vscode";

import BOJ from "../api/boj";

import { getProblemNumber } from "../lib";
import { ViewManager } from "../views";

const showProblemInformationSubscription = vscode.commands.registerCommand(
  "bojvscode.showProblemInformation",
  async () => {
    const problem = await BOJ.getProblem(getProblemNumber());
    ViewManager.show("PROBLEM_VIEW");
  }
);

export { showProblemInformationSubscription };
