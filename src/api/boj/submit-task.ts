import { SubmitTasksView } from "../../views/tasks";
import { IBOJScoringStatus } from "./interfaces/boj-scoring-status";

class SubmitTask {
  constructor(
    public problemNumber: number,
    public scoringStatus: IBOJScoringStatus = {
      solution_id: "",
      result: "1",
      partially_accepted: "0",
      timestamp: 0,
      result_color: "waiting",
      result_name: "준비중",
      expect_running: ""
    }
  ) {}
}

class SubmitTaskManager {
  private static submitTasks = new Map<string, SubmitTask>();

  static createTask(solutionId: string, problemNumber: number) {
    this.submitTasks.set(solutionId, new SubmitTask(problemNumber));
  }

  static updateTask(
    solutionId: string,
    scoringStatus: IBOJScoringStatus
  ): void {
    const task = this.submitTasks.get(solutionId);
    if (task !== undefined) {
      task.scoringStatus = scoringStatus;
      SubmitTasksView.render();
    }
  }

  static get tasks() {
    return Array.from(this.submitTasks.entries());
  }
}

export { SubmitTaskManager };
