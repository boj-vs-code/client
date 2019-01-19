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