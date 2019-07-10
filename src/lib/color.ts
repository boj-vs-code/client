import { ScoringStatus } from "../api/boj/enums/scoring-status";
import { ScoringStatusColor } from "../api/boj/enums/scoring-status-color";

export function getColorFromScoringStatus(code: ScoringStatus): string {
  const status = ScoringStatus[code];
  return ScoringStatusColor[status as any];
}
