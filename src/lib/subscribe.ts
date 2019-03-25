import { bojSession } from "../session";
import { SubmitTaskManager } from "../api/boj/managers/submit-task";
import { ViewManager } from "../views";

export function registerProblemSubscribers(solution_id: string) {
  const interval = setInterval(async () => {
    const scoringStatus = await bojSession.solved(solution_id);
    if (Number(scoringStatus.result) >= 4) {
      clearInterval(interval);
    }
    SubmitTaskManager.getInstance().updateTask(solution_id, scoringStatus);
    ViewManager.render();
  }, 100);
}
