import * as Pusher from "pusher-js";
import { SubmitTaskManager } from "./api/boj/submit-task";
import { renderSubmitTasks } from "./views/tasks";

const pusher = new Pusher("a2cb611847131e062b32", {
  cluster: "ap1",
  encrypted: !0
});

export function registerProblemSubscribers(solution_id: string) {
  const subcribe = pusher.subscribe(`solution-${solution_id}`);
  subcribe.bind("update", data => {
    SubmitTaskManager.updateTask(solution_id, data);
    if (data.progress === undefined) {
      pusher.unsubscribe(`solution-${solution_id}`);
    }
    renderSubmitTasks();
  });
}
