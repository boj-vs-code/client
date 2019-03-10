import * as vscode from "vscode";

import { getLanguages, getLanguage, getSource, getProblemNumber } from ".";
import { bojSession } from "../session";
import { registerProblemSubscribers } from "./pusher";
import { SubmitTasksView } from "../views/tasks";

export async function submitBOJ() {
  vscode.window.showInformationMessage("Let's submit code xD");

  const languages = getLanguages();
  const languageNames = languages.map(x => x.language);
  const regexp = new RegExp(`^${getLanguage()}(\\s|$|\\d)+`);
  const filtered = languageNames.filter(
    x =>
      x
        .replace(/\+/g, "p")
        .replace(/\#/g, "sharp")
        .replace(/\./g, "")
        .toLowerCase()
        .search(regexp) !== -1
  );

  let selectedLanguage: string | undefined;
  if (filtered.length === 1) {
    selectedLanguage = filtered[0];
  } else {
    selectedLanguage = await vscode.window.showQuickPick(
      0 === filtered.length ? languageNames : filtered
    );
  }

  if (selectedLanguage === undefined) {
    vscode.window.showErrorMessage("You didn't select the Language");
    return;
  }

  const language = languages.filter(x => x.language === selectedLanguage)[0];
  const problemNumber = getProblemNumber();
  const source = getSource();

  const solutionId = await bojSession.submit(problemNumber, language, source);
  registerProblemSubscribers(solutionId);
  SubmitTasksView.show();
}
