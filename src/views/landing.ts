import * as vscode from "vscode";
import { extensionSession } from "../session";
import { ViewManager } from ".";

export function showLandingView(): void {
  const panel = ViewManager.main;

  panel.webview.html = `
    <h1>Hello!!! welcome to boj-vs-code!!</h1>
    <img src="https://raw.githubusercontent.com/moreal/boj-vs-code/master/resources/images/logo-white.png">
  `;
}
