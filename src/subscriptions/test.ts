import * as vscode from "vscode";

import { ViewManager } from "../views";
import { TestManager } from "../api/boj/managers/test";
import { getProblemNumber, getLanguageFromEditor, getSource, getSourceFilePath, getLanguageInfoWithName, showAndPickLanguageName } from "../lib";
import BOJ from "../api/boj";
import { ExecutorManager } from "../executors/manager";

const executeTestSubscription = vscode.commands.registerCommand(
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
    if (!ExecutorManager.exists(languageName)) {
      vscode.window.showInformationMessage("아직 지원하지 않는 언어입니다. :( / " + languageName);
      return;
    }
    TestManager.getInstance().createTest(problem, languageName, getSourceFilePath());
    ViewManager.show("TEST_VIEW");
  }
);

export { executeTestSubscription };
