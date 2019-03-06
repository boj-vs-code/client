import { TestCase } from "./testcase";

interface IProblemMetadata {
  timeLimit?: string;
  memoryLimit?: string;
  submitCount?: string | Number;
  successCount?: string | Number;
  successPeopleCount?: string | Number;
  answerPercent?: string | Number;
}

export class Problem {
  constructor(
    public title: string,
    public description: string,
    public inputDescription: string,
    public outputDescription: string,
    public testcases: Array<TestCase>,
    public metadata: IProblemMetadata
  ) {}

  public equals(problem: Problem): boolean {
    return (
      this.title === problem.title &&
      this.description === problem.description &&
      this.inputDescription === problem.inputDescription &&
      this.outputDescription === problem.outputDescription &&
      this.testcases === this.testcases
    );
  }
}
