import { ScoringStatusColor } from "../api/boj/enums/scoring-status-color";
import { ScoringStatus } from "../api/boj/enums/scoring-status";

export function getColorFromScoringStatus(
  code: ScoringStatus
): ScoringStatusColor {
  for (const key in ScoringStatusColor) {
    if (((ScoringStatus[key as any] as any) as ScoringStatus) === code) {
      return (ScoringStatusColor[key] as any) as ScoringStatusColor;
    }
  }
  return ScoringStatusColor.WAITING;
}
