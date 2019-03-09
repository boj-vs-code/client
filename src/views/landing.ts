import { ViewManager } from ".";

const LandingView = {
  show(): void {
    const panel = ViewManager.main;

    panel.title = "BOJ-vs-code";

    panel.webview.html = `
      <h1>Hello!!! welcome to boj-vs-code!!</h1>
      <img src="https://raw.githubusercontent.com/moreal/boj-vs-code/master/resources/images/logo-white.png">
    `;
  }
};

export { LandingView };
