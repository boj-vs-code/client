import * as assert from "assert";

import { ScoringStatus } from "../../api/boj/enums/scoring-status";
import { ScoringStatusColor } from "../../api/boj/enums/scoring-status-color";
import { getColorFromScoringStatus } from "../../lib/color";

suite("Rendering Libraries Test as lib/color", () => {
  const testcases: string[] = Object.keys(ScoringStatusColor);

  suite("getColorFromScoringStatus", () => {
    testcases.forEach(x => {
      test(`(${x})`, () => {
        const scoringStatus = (ScoringStatus[x as any] as any) as ScoringStatus;
        const color = ScoringStatusColor[x as any];

        assert.equal(getColorFromScoringStatus(scoringStatus), color);
      });
    });
  });
});
