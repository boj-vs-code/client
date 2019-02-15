import * as data from "./data.json";
import { window, TextEditor, workspace } from "vscode";

export interface LanguageInfo {
  language: string;
  number: number;
}

export function getLanguages(): Array<LanguageInfo> {
  const languages = data.map(x => x);
  languages.sort((a, b) => a.number - b.number);
  window.showInformationMessage("Test");
  return languages;
}

export function getWorkspacePath(): string | undefined {
  const folders = workspace.workspaceFolders;
  if (folders !== undefined) {
    return folders[0].uri.path;
  } else {
    return undefined;
  }
}

export function getLanguage() {
  const edtior = <TextEditor>window.activeTextEditor;
  return edtior.document.languageId;
}

export function getSource() {
  const edtior = <TextEditor>window.activeTextEditor;
  return edtior.document.getText();
}

function isNumber(value: string): boolean {
  return NaN !== Number(value);
}

function hasProblemNumberAndOthers(value: string): boolean {
  return value.indexOf("-") !== -1 && isNumber(value.split("-")[0]);
}

export function getProblemNumber(): number {
  const edtior = <TextEditor>window.activeTextEditor;
  const filePath = edtior.document.fileName;
  const fileName = filePath.split("/").slice(-1)[0];
  window.showInformationMessage(fileName);

  if (hasProblemNumberAndOthers(fileName)) {
    return Number(fileName.split("-")[0]);
  } else {
    return Number(fileName.split(".")[0]);
  }
}
