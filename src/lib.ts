import * as data from './data.json';

interface IJSONModuleToMap
{
    [key: string]: string[];
}

function getLanguagesAndExtensions(): Map<string, Set<String>> {
    const languageMap: IJSONModuleToMap = data;
    const newMap: Map<string, Set<String>> = new Map<string, Set<String>>();
    for (let language in languageMap) {
        newMap.set(language, new Set<string>(languageMap[language]));
    }
    return newMap;
}

export function toLanguage(extension: string): string {
    const languageAndExtensions = getLanguagesAndExtensions();
    for (let [language, extensions] of languageAndExtensions.entries()) {
        if (extensions.has(extension)) {
            return language;
        }
    }
    return "unknown"
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
