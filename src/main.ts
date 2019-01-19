import * as process from "process";
import { toLanguage, isNumber, hasProblemNumberAndOthers } from "./lib";

const argv = process.argv.slice(2);

const filename = argv[0];
const extname = argv[1].slice(1);
const language = toLanguage(extname);
const dirname = argv[2].split('/').slice(0, -1).reverse()[0];

if (filename === "solve") {
    
} else if (isNumber(filename)) {
    
} else if (hasProblemNumberAndOthers(filename)) { // if filename has - to notice problem name
    
} else {
    // vscode.window.showErrorMessage("BOJ Can't know the problem number!");
    // SHOW WARNING ERROR: Cant know problem number
}

console.log(filename, toLanguage(extname), dirname);