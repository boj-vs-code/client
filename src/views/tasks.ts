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
      ([solution_id, { problemNumber, scoringStatus }]) => `
      <div>
        <h3>${problemNumber}</h3>
        solution_id: ${solution_id}<br/>
        status: ${scoringStatus ? scoringStatus.result_name : "준비 중"}
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
