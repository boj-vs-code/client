import * as vscode from "vscode";
import { getLanguages, getLanguage, getSource, getProblemNumber } from "./lib";
import { BOJSession } from "./api/boj";

async function submitBOJ(session: BOJSession) {
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

  await session.submit(problemNumber, language, source);
}

export { submitBOJ };
