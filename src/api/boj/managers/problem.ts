import { Problem } from "../problem";

export class ProblemManager {
  private static instance: ProblemManager;
  private problems: Array<Problem> = new Array<Problem>();

  private constructor() {}

  static getInstance(): ProblemManager {
    return this.instance || (this.instance = new ProblemManager());
  }

  get recent(): Problem {
    return this.problems[this.problems.length - 1];
  }
}
