import { ViewManager, BaseView } from ".";
import { getExtensionInstalledPath } from "../lib";
import { log } from "util";

export class WelcomeView extends BaseView {
  public VIEW_NAME = "WELCOME_VIEW";

  public show(): void {
    ViewManager.panel.title = "BOJ-vs-code";
  }

  public render(): void {
    const logoUrl = "https://raw.githubusercontent.com/boj-vs-code/client/master/resources/images/logo.png";
    ViewManager.panel.webview.html = `
      <h1>안녕하세요! 백준 풀러오셨나요? 😉</h1>
      <img src="${logoUrl}" width=200px height=200px/><br>

      <p>파일명은 <b>문제번호.c</b> 와 같은 형식으로 해주셔야 문제 번호를 인식할 수 있습니다!</p>

      <h3>단축키</h3>
      <p><b>ctrl+alt+i</b> 를 눌러 문제 정보를 볼 수 있습니다!</p>
      <p><b>ctrl+alt+r</b> 를 눌러 테스트 케이스를 돌려보실 수 있습니다!</p>
    `;
  }
}
