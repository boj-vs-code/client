import { extensionSession } from "../session";
import * as vscode from "vscode";
import { IBaseView } from "./interfaces/base-view";

const BOJ_VIEW = "BOJ_VIEW";

function createAndStoreViewIfNotExists() {
  if (!extensionSession.has(BOJ_VIEW)) {
    const panel = vscode.window.createWebviewPanel(
      "boj-vs-code-view",
      "",
      vscode.ViewColumn.Eight,
      {}
    );

    panel.onDidDispose(() => {
      extensionSession.delete(BOJ_VIEW);
    });

    extensionSession.set(BOJ_VIEW, panel);
  }
}

export class ViewManager {
  private static views: IBaseView[];
  private static currentView: IBaseView;

  static get panel(): vscode.WebviewPanel {
    createAndStoreViewIfNotExists();
    return <vscode.WebviewPanel>extensionSession.get(BOJ_VIEW);
  }

  static get current(): IBaseView {
    return this.currentView;
  }

  static registerView(view: IBaseView) {
    this.views.push(view);
  }

  static changeView(viewName: string) {
    this.currentView = this.views.filter(
      view => view.VIEW_NAME === viewName
    )[0];
  }

  static hide() {
    this.panel.dispose();
  }

  static render() {
    this.currentView.render();
  }

  static show(viewName?: string) {
    if (viewName !== undefined) {
      this.changeView(viewName);
    }

    this.currentView.show();
  }
}
