import { Webview } from "vscode";

import { ViewManager } from ".";
import { SubmitTaskManager } from "../api/boj/submit-task";

export function showSubmitTasksView() {
  const panel = ViewManager.main;

  panel.title = "Submit Tasks";

  renderSubmitTasks(panel.webview);
}

function renderSubmitTasks(webview: Webview) {
  const tasks = SubmitTaskManager.tasks.map(
    ([solution_id, { problem, status }]) => `
      <div>
        <h3>${problem.title}</h3>
        solution_id: ${solution_id}<br/>
        status: ${status ? status.result : "준비 중"}
      </div>
    `
  );

  webview.html = `
    <h1>Submit Tasks</h1>  
    ${tasks.reduce((prev, current) => prev + current, "")}
  `;
}
