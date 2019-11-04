import { ViewManager, BaseView } from ".";
import { getColorFromScoringStatus } from "../lib/color";
import { ScoringStatus } from "../api/boj/enums/scoring-status";
import { SubmitTaskManager } from "../api/boj/managers/submit-task";
import { TestManager } from "../api/boj/managers/test";

function cast<T>(obj: any): T {
  return obj as T;
}

/**
 * View to show result of testcases.
 */
export class TestView extends BaseView {
  public VIEW_NAME = "TEST_VIEW";
  state: {compile?: string} = {};

  public show() {
    ViewManager.panel.title = "Result of the test";
  }

  public render() {
    const manager = TestManager.getInstance();
    const tests = manager.tests.map((test, index) => {
      const testResult = manager.testResults[index];
      const description = testResult[0] ? '' : `
        <h4>Input</h4>
        <pre>${testResult[1]}</pre>
        <h4>Expected Output</h4>
        <pre>${testResult[2]}</pre>
        <h4>Your output</h4>
        <pre>${testResult[3]}</pre>
      `;
      return `
        <div>
          <h2>${test.problem.title} [lang: ${test.languageName}]</h2>
          <div>
            <p>${testResult[0] ? 'CLEAR' : 'FAILED'}</p>
            ${description}
          </div>
        </div>
      `;
    });

    ViewManager.panel.webview.html = `
      <!DOCTYPE html>
      <html>
        <head>
        </head>
        <body>
          <div class="container">
            <h1>Test</h1>
            ${tests.reduce((prev, current) => prev + current, "")}
          </div>
        </body>
      </html>
    `;
  }
}
