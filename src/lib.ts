import * as data from './data.json';
import { window, TextEditor } from "vscode"

interface LanguageInfo {
    language: string,
    number: number,
}

function getLanguages(): Array<LanguageInfo> {
    const languages: Array<LanguageInfo> = Array.from(data.values());
    return languages;
}

export function showLanguage() {
    const edtior = <TextEditor>window.activeTextEditor
    window.showInformationMessage(edtior.document.languageId)
}

function isNumber(value: string): boolean {
    return NaN !== Number(value)
}

function hasProblemNumberAndOthers(value: string): boolean {
    return value.indexOf('-') !== -1 && isNumber(value.split('-')[0])
}

export function getProblemNumber(): number {
    const edtior = <TextEditor>window.activeTextEditor
    const fileName = edtior.document.fileName
    
    if(hasProblemNumberAndOthers(fileName)) {
        return Number(fileName.split('-')[0])
    } else {
        return Number(fileName.split('.')[0])
    }
}
