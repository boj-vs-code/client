import * as vscode from "vscode";

import {
  getSource,
  getProblemNumber,
  getLanguageInfoWithName,
  showAndPickLanguageName
} from ".";

import { ViewManager } from "../views";
import { bojSession } from "../session";
import { SubmitTaskManager } from "../api/boj/managers/submit-task";
import { registerProblemSubscribers } from "./subscribe";

export async function submitBOJ() {
  vscode.window.showInformationMessage("Let's submit code xD");

  const selectedLanguage = await showAndPickLanguageName();

  if (selectedLanguage === undefined) {
    vscode.window.showErrorMessage("You didn't select the Language");
    return;
  }

  const language = getLanguageInfoWithName(selectedLanguage);
  const problemNumber = getProblemNumber();
  const source = getSource();

  const solutionId = await bojSession.submit(problemNumber, language, source);
  SubmitTaskManager.getInstance().createTask(solutionId, problemNumber);
  registerProblemSubscribers(solutionId);
  ViewManager.show("SUBMIT_TASK_VIEW");
}
