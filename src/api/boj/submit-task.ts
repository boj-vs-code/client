import { SubmitTasksView } from "../../views/tasks";
import { IBOJScoringStatus } from "./interfaces/boj-scoring-status";

class SubmitTask {
  constructor(
    public problemNumber: number,
    public scoringStatus: IBOJScoringStatus = {
      solution_id: "",
      result: "1",
      partially_accepted: "0",
      timestamp: Date.now(),
      result_color: "waiting",
      result_name: "준비중",
      expect_running: ""
    }
  ) {}
}

export class SubmitTaskManager {
  private static instance: SubmitTaskManager;
  private submitTasks = new Map<string, SubmitTask>();

  public limit = 3;

  private constructor() {}

  static getInstance(): SubmitTaskManager {
    return this.instance || (this.instance = new SubmitTaskManager());
  }

  createTask(solutionId: string, problemNumber: number) {
    if (SubmitTasksView.length < this.limit) {
    }
    this.submitTasks.set(solutionId, new SubmitTask(problemNumber));
  }

  updateTask(solutionId: string, scoringStatus: IBOJScoringStatus): void {
    const task = this.submitTasks.get(solutionId);
    if (task !== undefined) {
      task.scoringStatus = scoringStatus;
    }
  }

  get tasks(): Array<[string, SubmitTask]> {
    return Array.from(this.submitTasks.entries()).reverse();
  }

  clear() {
    this.submitTasks.clear();
  }
}
