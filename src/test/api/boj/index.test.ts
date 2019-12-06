import * as assert from "assert";
import BOJ, { BOJSession } from "../../../api/boj";

suite("BOJ API TEST at api/boj", function() {
  suite("BOJ#getProblem", () => {
    const testcases: Array<[number, string]> = [[1000, "A+B"], [1001, "A-B"]];
    testcases.forEach(([problemNumber, expectedTitle]) => {
      test(`(${problemNumber}) => ${expectedTitle}`, async () => {
        const problem = await BOJ.getProblem(problemNumber);
        const { title } = problem || { title: undefined };
        assert.equal(title, expectedTitle);
      });
    });
  });

  suite("BOJSession#solved", () => {
    const testcases = [
      ["12104816", "런타임 에러"],
      ["12104815", "틀렸습니다"],
      ["12104814", "시간 초과"],
      ["12104813", "맞았습니다!!"],
      ["12104783", "컴파일 에러"],
      ["12104777", "출력 형식이 잘못되었습니다"]
    ];

    const session: BOJSession = new BOJSession();
    session.loadConfigFromFile("fixtures/.bojconfig");

    testcases.forEach(([solutionId, result]) => {
      test(`(${solutionId}) => ${result}`, async () => {
        const scoringStatus = await session.solved(solutionId);
        assert.equal(scoringStatus.result_name, result);
      });
    });
  });
});
