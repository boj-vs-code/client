import { SubmitTaskManager } from "../api/boj/submit-task";
import { bojSession } from "../session";

export function registerProblemSubscribers(solution_id: string) {
  const interval = setInterval(async () => {
    const scoringStatus = await bojSession.solved(solution_id);
    if (Number(scoringStatus.result) >= 4) {
      clearInterval(interval);
    }
    SubmitTaskManager.updateTask(solution_id, scoringStatus);
  }, 100);
}
