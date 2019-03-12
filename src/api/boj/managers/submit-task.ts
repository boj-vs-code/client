import { SubmitTasksView } from "../../../views/tasks";
import { IBOJScoringStatus } from "../interfaces/boj-scoring-status";

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

export class SubmitTaskManager {
  private static instance: SubmitTaskManager;
  private submitTasks = new Array<[string, SubmitTask]>();

  public limit = 3;

  private constructor() {}

  static getInstance(): SubmitTaskManager {
    return this.instance || (this.instance = new SubmitTaskManager());
  }

  createTask(solutionId: string, problemNumber: number) {
    if (this.submitTasks.length >= this.limit) {
      this.submitTasks.pop();
    }
    this.submitTasks.unshift([solutionId, new SubmitTask(problemNumber)]);
  }

  updateTask(solutionId: string, scoringStatus: IBOJScoringStatus): void {
    const task = this.submitTasks.filter(task => task[0] === solutionId)[0][1];
    if (task !== undefined) {
      task.scoringStatus = scoringStatus;
    }
  }

  get tasks(): Array<[string, SubmitTask]> {
    return this.submitTasks;
  }

  clear() {
    this.submitTasks = [];
  }
}
