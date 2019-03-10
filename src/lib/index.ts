import { window, TextEditor, workspace, languages } from "vscode";

import * as data from "../resources/languages.json";

export interface LanguageInfo {
  name: string;
  number: number;
}

export function getLanguages(): Array<LanguageInfo> {
  const languages = data.map(x => x);
  languages.sort((a, b) => a.number - b.number);
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

export function getLanguageFromEditor(): string {
  const edtior = <TextEditor>window.activeTextEditor;
  return edtior.document.languageId;
}

export function getLanguageInfoWithName(name: string): LanguageInfo {
  return getLanguages().filter(x => x.name === name)[0];
}

export function getSource(): string {
  const edtior = <TextEditor>window.activeTextEditor;
  return edtior.document.getText();
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

function isNumber(value: string): boolean {
  return NaN !== Number(value);
}

function hasProblemNumberAndOthers(value: string): boolean {
  return value.indexOf("-") !== -1 && isNumber(value.split("-")[0]);
}
