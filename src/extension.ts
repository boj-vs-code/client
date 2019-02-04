// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { getLanguages, getLanguage } from "./lib";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
		console.log('Congratulations, your extension "boj-vs-code-ts" is now active!');
		vscode.window.showInformationMessage('Activate!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	// let
	let disposable = vscode.commands.registerCommand('extension.submitBOJ', async () => {
		// The code you place here will be executed every time your command is executed
		// context.workspaceState.get('path')
		// Display a message box to the user
		
		vscode.window.showInformationMessage('Hello World!!!!');
		
		const languages = getLanguages().map(x => x.language);
		const filtered = languages
				.filter(x => {
					// vscode.window.showInformationMessage(x.replace('+', 'p').replace('#', 'sharp'));
					return x.replace(/\+/g, 'p').replace(/\#/g, 'sharp').toLowerCase().indexOf(getLanguage()) !== -1})
		
		const value = await vscode.window.showQuickPick(
			0 === filtered.length ? languages : filtered
		);

		if (value !== undefined)
			vscode.window.showInformationMessage(value);

		vscode.window.showInputBox({
			placeHolder: 'Input something 한국어 테스트'
		}).then((value?: string) => {
			if (value !== undefined)
				vscode.window.showInformationMessage(value);
		})
		vscode.languages.getLanguages().then(l => { vscode.window.showInformationMessage("a"+l) })
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
