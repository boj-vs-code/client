import * as data from './data.json';
import { window, TextEditor } from "vscode"

interface LanguageInfo {
    language: string,
    number: number,
}

function getLanguagesAndExtensions(): Map<string, Set<String>> {
    const languages: Array<LanguageInfo> = Array.from(data.values());
    console.log(languages)
    const newMap: Map<string, Set<String>> = new Map<string, Set<String>>();
    // for (let language in languageMap) {
    //     newMap.set(language, new Set<string>(languageMap[language]));
    // }
    return newMap;
}

function getLanguage() {
    const edtior = <TextEditor>window.activeTextEditor
    window.showInformationMessage(edtior.document.languageId)
}

export function isNumber(value: string): boolean {
    return NaN !== Number(value)
}

export function hasProblemNumberAndOthers(value: string): boolean {
    return value.indexOf('-') !== -1 && isNumber(value.split('-')[0])
}

export function getProblemNumber(value: string): string {
    return value.split('-')[0];
}
