import * as vscode from "vscode";
import { getLanguages, getLanguage, getSource, getProblemNumber } from "./lib";
import { BOJSession } from "./api/boj";

async function submitBOJ(session: BOJSession) {
  vscode.window.showInformationMessage("Let's submit code xD");

  const languages = getLanguages();
  const languageNames = languages.map(x => x.language);
  const filtered = languageNames.filter(x => {
    return (
      x
        .replace(/\+/g, "p")
        .replace(/\#/g, "sharp")
        .toLowerCase()
        .indexOf(getLanguage()) !== -1
    );
  });

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

  // get language
  const language = languages.filter(x => x.language === selectedLanguage)[0];

  // get problem
  const problemNumber = getProblemNumber();

  // get source
  const source = getSource();

  await session.submit(problemNumber, language, source);
}

export { submitBOJ };
