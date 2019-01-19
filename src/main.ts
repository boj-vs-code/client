import * as process from "process";
import * as lib from "./lib";

const toLanguage = lib.toLanguage;

const argv = process.argv.slice(2);

const filename = argv[0];
const extname = argv[1].slice(1);
const dirname = argv[2].split('/').slice(0, -1).reverse()[0];

if (filename === "solve") { // directory will have the problem number, if else
    // TODO
} else if (NaN !== Number(filename)) {  // if filename is problem number
    
} else if (filename.indexOf('-') !== -1 && NaN !== Number(filename.split('-')[0])) { // if filename has - to notice problem name
    
} else {
    // vscode.window.showErrorMessage("BOJ Can't know the problem number!");
    // SHOW WARNING ERROR: Cant know problem number
}

console.log(filename, toLanguage(extname), dirname);