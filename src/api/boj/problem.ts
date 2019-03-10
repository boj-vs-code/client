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
}
