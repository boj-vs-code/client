import { window, TextEditor, workspace, extensions } from "vscode";

import * as vscode from "vscode";
import * as data from "../resources/languages.json";
import * as path from "path";

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
  const editor = <TextEditor>window.activeTextEditor;
  const filePath = editor.document.fileName;
  const fileName = path.parse(filePath).name;

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

export function getExtensionInstalledPath(): string | undefined {
  const extension = extensions.getExtension("bojvscode.boj-vs-code");
  if (extension !== undefined) {
    return extension.extensionPath;
  } else {
    return "/";
  }
}

export function getSourceFilePath(): string {
  const edtior = <TextEditor>window.activeTextEditor;
  return edtior.document.uri.fsPath; 
}


export async function showAndPickLanguageName(): Promise<string | undefined> {
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