import { IBaseView } from "./interfaces/base-view";
import { ViewManager } from ".";
import { ScoringStatus } from "../api/boj/enums/scoring-status";
import { SubmitTaskManager } from "../api/boj/managers/submit-task";
import { getColorFromScoringStatus } from "../lib/color";

function cast<T>(obj: any): T {
  return obj as T;
}

export class SubmitTasksView implements IBaseView {
  private static instance: SubmitTasksView;

  private constructor() {}

  static getInstance(): SubmitTasksView {
    return this.instance || (this.instance = new SubmitTasksView());
  }
  public VIEW_NAME = "SUBMIT_VIEW";

  public show() {
    ViewManager.main.title = "Submit Tasks";
  }

  public render() {
    const tasks = SubmitTaskManager.getInstance().tasks.map(
      ([solution_id, { problemNumber, scoringStatus }]) => {
        const color = cast<ScoringStatus>(scoringStatus.result),
          result = scoringStatus.result_name,
          datetime = new Date(scoringStatus.timestamp * 1000);
        return `
            <div data-solution-id="${solution_id}" class="submit">
              <h4>
                [${datetime.toLocaleString()}]
              </h4>
              <h3>
                ${problemNumber}
                <font color="${getColorFromScoringStatus(color)}">
                  ${result}
                </font>
              </h3>
            </div>
          `;
      }
    );

    ViewManager.main.webview.html = `
      <!DOCTYPE html>
      <html>
        <head>
        </head>
        <body>
          <div class="container">
            <h1>Submit Tasks</h1>
            ${tasks.reduce((prev, current) => prev + current, "") ||
              "아직 아무것도 제출하지 않으셨네요 :( / ctrl+alt+s 로 제출할 수 있어요!"}
          </div>
        </body>
      </html>
    `;
  }
}
