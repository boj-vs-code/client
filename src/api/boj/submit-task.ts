import { Problem } from "./problem";

interface SubmitTaskStatus {
  progress?: number;
  memory?: number;
  time?: number;
  result: number;
}

class SubmitTask {
  constructor(public problem: Problem, public status?: SubmitTaskStatus) {}
}

class SubmitTaskManager {
  private static submitTasks = new Map<string, SubmitTask>();

  static createTask(solutionId: string, problem: Problem) {
    this.submitTasks.set(solutionId, new SubmitTask(problem));
  }

  static updateTask(
    solutionId: string,
    submitTaskStatus: SubmitTaskStatus
  ): void {
    const task = this.submitTasks.get(solutionId);
    if (task !== undefined) {
      task.status = submitTaskStatus;
    }
  }

  static get tasks() {
    return Array.from(this.submitTasks.entries());
  }
}

export { SubmitTaskManager };
