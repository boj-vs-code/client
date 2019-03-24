import { ViewManager, BaseView } from ".";

export class WelcomeView extends BaseView {
  public VIEW_NAME = "WELCOME_VIEW";

  public show(): void {
    ViewManager.panel.title = "BOJ-vs-code";
  }

  public render(): void {
    ViewManager.panel.webview.html = `
      <h1>Hello!!! welcome to boj-vs-code!!</h1>
      <img src="https://raw.githubusercontent.com/moreal/boj-vs-code/master/resources/images/logo-white.png">
    `;
  }
}