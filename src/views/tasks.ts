import { ViewManager } from ".";
import { Problem } from "../api/boj/problem";
import { stat } from "fs";

type Handler<T> = (changed: T) => void;

class ObservableArray<T> extends Array<T> {
  private handlers: Array<Handler<T>> = new Array<Handler<T>>();

  push(...items: T[]): number {
    const returnValue = super.push(...items);
    items.forEach(item => {
      this.handlers.forEach(fn => fn(item));
    });
    return returnValue;
  }

  registerHandler(fn: (changed: T) => void) {
    this.handlers.push(fn);
  }
}

class SubmitTask {
  constructor(
    public problem: Problem,
    public status: string,
    public solution_id: string
  ) {}
}

class SubmitTasksManager {
  public static singleton = new SubmitTasksManager();

  public submitTasks = new ObservableArray<SubmitTask>();

  appendTasks(problem: Problem, status: string, solution_id: string): void {
    this.submitTasks.unshift(new SubmitTask(problem, status, solution_id));
  }
}

export function showSubmitTasksView() {
  const panel = ViewManager.main;

  const tasks = SubmitTasksManager.singleton.submitTasks.map(
    ({ problem, status, solution_id }) => `
      <div>
        <h3>${problem.title}</h3>
        solution_id: ${solution_id}<br/>
        status: ${status}
      </div>
    `
  );

  panel.webview.html = `
    <h1>Submit Tasks</h1>  
    ${tasks.reduce((prev, current) => prev + current, "")}
  `;
}
