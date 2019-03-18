import { Problem } from "../problem";
import Axios from "axios";
import { IProblemWithNumber } from "../interfaces/problem-with-number";
import { filter } from "minimatch";

export class ProblemManager {
  private API_SERVER_HOST = "boj-api.moreal.kr";

  private static instance: ProblemManager;
  private problems: Array<IProblemWithNumber> = new Array<IProblemWithNumber>();

  private constructor() {}

  static getInstance(): ProblemManager {
    return this.instance || (this.instance = new ProblemManager());
  }

  get recent(): Problem | undefined {
    if (this.problems.length === 0) {
      return undefined;
    }
    return this.problems[this.problems.length - 1].problem;
  }

  async getProblem(problemNumber: number): Promise<Problem | undefined> {
    const filterdProblems = this.problems.filter(
      x => x.problemNumber === problemNumber
    );

    if (filterdProblems.length === 0) {
      const resp = await Axios.get(
        `http://${this.API_SERVER_HOST}/problem/${problemNumber}`
      );

      this.problems.push({
        problemNumber: problemNumber,
        problem: resp.data as Problem
      });
    }

    return this.recent;
  }
}
