import { extensionSession } from "../session";
import * as vscode from "vscode";

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

export abstract class BaseView {
  VIEW_NAME: string = "VIEW";
  state: any = {};

  abstract show(): void;
  abstract render(): void;

  setState(state: any): void {
    this.state = state;
    this.render();
  }
}

export class ViewManager {
  private static views: Array<BaseView> = new Array<BaseView>();
  private static currentView: BaseView;
  private static state: any;

  static get panel(): vscode.WebviewPanel {
    createAndStoreViewIfNotExists();
    return <vscode.WebviewPanel>extensionSession.get(BOJ_VIEW);
  }

  static get current(): BaseView {
    return this.currentView;
  }

  static registerView(view: BaseView) {
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
    this.currentView.render();
  }

  static setState(state: any) {
    this.currentView.setState(state);
  }
}
