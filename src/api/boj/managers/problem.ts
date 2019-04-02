import * as fs from "fs";
import Axios from "axios";
import { Problem } from "../problem";
import { getExtensionInstalledPath } from "../../../lib";

export class ProblemManager {
  private API_SERVER_HOST = "boj-vs-code.appspot.com";

  private static instance: ProblemManager;
  private problems: Map<number, Problem> = new Map<number, Problem>();
  private recentProblemNumber: number = -1;

  private constructor() {}

  static getInstance(): ProblemManager {
    return this.instance || (this.instance = new ProblemManager());
  }

  get recent(): Problem | undefined {
    if (this.recentProblemNumber === -1) {
      return undefined;
    }
    return this.problems.get(this.recentProblemNumber);
  }

  private getProblemPathOnDisk(problemNumber: number): string {
    return `${getExtensionInstalledPath()}/resources/problems/${problemNumber}.json`;
  }

  private loadProblemFromDisk(problemNumber: number): Problem {
    return JSON.parse(
      fs.readFileSync(this.getProblemPathOnDisk(problemNumber)).toString()
    );
  }

  private async loadProblemFromApi(problemNumber: number): Promise<Problem> {
    const resp = await Axios.get(
      `http://${this.API_SERVER_HOST}/problem/${problemNumber}`
    );

    return resp.data as Problem;
  }

  private saveProblemOnDisk(problemNumber: number, problem: Problem) {
    fs.writeFileSync(
      this.getProblemPathOnDisk(problemNumber),
      JSON.stringify(problem)
    );
  }

  private existsInMemory(problemNumber: number): boolean {
    return this.problems.has(problemNumber);
  }

  private existsInDisk(problemNumber: number): boolean {
    return fs.existsSync(this.getProblemPathOnDisk(problemNumber));
  }

  async getProblem(problemNumber: number): Promise<Problem | undefined> {
    if (this.existsInMemory(problemNumber)) {
    } else if (this.existsInDisk(problemNumber)) {
      const problem = this.loadProblemFromDisk(problemNumber);
      this.problems.set(problemNumber, problem);
    } else {
      const problem = await this.loadProblemFromApi(problemNumber);
      this.saveProblemOnDisk(problemNumber, problem);
      this.problems.set(problemNumber, problem);
    }

    this.recentProblemNumber = problemNumber;
    return this.recent;
  }
}
