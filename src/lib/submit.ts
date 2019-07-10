import * as vscode from "vscode";

import {
  getSource,
  getLanguages,
  getProblemNumber,
  getLanguageFromEditor,
  getLanguageInfoWithName
} from ".";

import { ViewManager } from "../views";
import { bojSession } from "../session";
import { SubmitTaskManager } from "../api/boj/managers/submit-task";
import { registerProblemSubscribers } from "./subscribe";

async function showAndPickLanguageName(): Promise<string | undefined> {
  const languages = getLanguages();
  const languageNames = languages.map(x => x.name);
  const regexp = new RegExp(`^${getLanguageFromEditor()}(\\s|$|\\d)+`);

  const similarLanguages = languageNames.filter(
    x =>
      x
        .replace(/\+/g, "p")
        .replace(/\#/g, "sharp")
        .replace(/\./g, "")
        .toLowerCase()
        .search(regexp) !== -1
  );

  if (similarLanguages.length === 1) {
    return similarLanguages[0];
  } else {
    return await vscode.window.showQuickPick(
      0 === similarLanguages.length ? languageNames : similarLanguages
    );
  }
}

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
