import { ScoringStatusColor } from "../api/boj/enums/scoring-status-color";
import { ScoringStatus } from "../api/boj/enums/scoring-status";

export function getColorFromScoringStatus(code: ScoringStatus): string {
  const status = ScoringStatus[code];
  return ScoringStatusColor[status as any];
}
