import * as vscode from "vscode";

import { ViewManager } from "../views";
import { TestManager } from "../api/boj/managers/test";
import { getProblemNumber, getLanguageFromEditor, getSource, getSourceFilePath, getLanguageInfoWithName, showAndPickLanguageName } from "../lib";
import BOJ from "../api/boj";

const executeTest = vscode.commands.registerCommand(
  "extension.executeTest",
  async () => {
    const problem = await BOJ.getProblem(getProblemNumber());
    if (problem === undefined) {
      return;
    }
    const languageName = await showAndPickLanguageName();
    if (languageName === undefined) {
      vscode.window.showInformationMessage("It was canceled!");
      return;
    }
    TestManager.getInstance().createTest(problem, languageName, getSourceFilePath());
    ViewManager.show("TEST_VIEW");
  }
);

export { executeTest };
