import { ViewManager } from ".";
import { ScoringStatus } from "../api/boj/enums/scoring-status";
import { SubmitTaskManager } from "../api/boj/submit-task";
import { getColorFromScoringStatus } from "../lib/color";

function cast<T>(obj: any): T {
  return obj as T;
}

const SubmitTasksView = {
  show() {
    const panel = ViewManager.main;

    panel.title = "Submit Tasks";

    this.render();
  },

  render() {
    const panel = ViewManager.main;

    const tasks = SubmitTaskManager.tasks.map(
      ([solution_id, { problemNumber, scoringStatus }]) => {
        const color = cast<ScoringStatus>(scoringStatus.result),
          result = scoringStatus.result_name;

        return `
          <div data-solution-id="${solution_id}" class="submit">
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

    panel.webview.html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            background-color: #464646;
            color: #F7F7F7;
          }

          .submit {
            background-color: #E3E3E3;
            width: 25vw;
            margin: 0 2vh;
            border-radius: 2vmax;
            color: black;
            padding: 2vmax;
          }
        </style>
      </head>
      <body>
        <h1>Submit Tasks</h1>
        ${tasks.reduce((prev, current) => prev + current, "") ||
          "아직 아무것도 제출하지 않으셨네요 :( / ctrl+alt+s 로 제출할 수 있어요!"}
      </body>
    </html>
  `;
  }
};

export { SubmitTasksView };
