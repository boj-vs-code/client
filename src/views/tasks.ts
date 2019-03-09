import { ViewManager } from ".";
import { SubmitTaskManager } from "../api/boj/submit-task";

const SubmitTasksView = {
  show() {
    const panel = ViewManager.main;

    panel.title = "Submit Tasks";

    this.render();
  },

  render() {
    const panel = ViewManager.main;

    const tasks = SubmitTaskManager.tasks.map(
      ([solution_id, { problem, status }]) => `
      <div>
        <h3>${problem.title}</h3>
        solution_id: ${solution_id}<br/>
        status: ${status ? status.result : "준비 중"}
      </div>
    `
    );

    panel.webview.html = `
    <h1>Submit Tasks</h1>  
    ${tasks.reduce((prev, current) => prev + current, "")}
  `;
  }
};

export { SubmitTasksView };
