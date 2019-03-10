import * as vscode from "vscode";

import {
  getSource,
  getLanguages,
  getProblemNumber,
  getLanguageFromEditor,
  getLanguageInfoWithName
} from ".";

import { bojSession } from "../session";
import { registerProblemSubscribers } from "./pusher";
import { SubmitTasksView } from "../views/tasks";

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
  registerProblemSubscribers(solutionId);
  SubmitTasksView.show();
}
