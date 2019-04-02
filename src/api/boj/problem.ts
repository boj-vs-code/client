export class Problem {
  constructor(
    public title: string,
    public description: string,
    public inputDescription: string,
    public outputDescription: string,
    public testcases: Array<string>
  ) {}
}
