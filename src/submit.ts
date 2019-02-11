import * as vscode from "vscode";
import { getLanguages, getLanguage, getSource, getProblemNumber } from "./lib";
import { BOJSession } from "./api/boj";

async function submitBOJ(session: BOJSession) {
  vscode.window.showInformationMessage("Let's submit code xD");

  vscode.window.showInformationMessage("data0?");

  const languages = getLanguages();

  vscode.window.showInformationMessage("data1?");
  const languageNames = languages.map(x => x.language);

  vscode.window.showInformationMessage("data2?");
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

  vscode.window.showInformationMessage("data3?");

  let selectedLanguage: string | undefined;
  if (filtered.length === 1) {
    selectedLanguage = filtered[0];
  } else {
    selectedLanguage = await vscode.window.showQuickPick(
      0 === filtered.length ? languageNames : filtered
    );
  }
  vscode.window.showInformationMessage("data3?");
  //   vscode.window.showInformationMessage(<string>selectedLanguage);

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
