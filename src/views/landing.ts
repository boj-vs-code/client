import { ViewManager } from ".";
import { IBaseView } from "./interfaces/base-view";

export class LandingView implements IBaseView {
  private static instance: LandingView;

  private constructor() {}

  static getInstance(): LandingView {
    return this.instance || (this.instance = new LandingView());
  }

  public VIEW_NAME = "LANDING_VIEW";

  public show(): void {
    ViewManager.main.title = "BOJ-vs-code";
  }

  public render(): void {
    ViewManager.main.webview.html = `
      <h1>Hello!!! welcome to boj-vs-code!!</h1>
      <img src="https://raw.githubusercontent.com/moreal/boj-vs-code/master/resources/images/logo-white.png">
    `;
  }
}
