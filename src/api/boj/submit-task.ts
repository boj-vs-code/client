import { SubmitTasksView } from "../../views/tasks";
import { IBOJScoringStatus } from "./interfaces/boj-scoring-status";

class SubmitTask {
  constructor(
    public problemNumber: number,
    public scoringStatus?: IBOJScoringStatus
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
