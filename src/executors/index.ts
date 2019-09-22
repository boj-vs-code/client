import { dirSync } from "tmp";
import { execSync } from "child_process";
import { resolve } from "path";

export class Executor {
    constructor(
        private prepareCommand: string,
        private runCommand: string
    ) {}

    private prepare(
        sourceFilePath: string,
        temporaryDirectoryPath: string) {
        execSync(`BOJ_TEMPDIR=${temporaryDirectoryPath} BOJ_SOURCE_FILE=${sourceFilePath}; ` + this.prepareCommand);
    }

    private run(
        sourceFilePath: string,
        temporaryDirectoryPath: string,
        input: string,
        expectedOutput: string): [boolean, string, string, string] {
        const buffer = execSync(`BOJ_TEMPDIR=${temporaryDirectoryPath} BOJ_SOURCE_FILE=${sourceFilePath}; `+
            this.runCommand, {input: input});
        const output = buffer.toString();
        return [expectedOutput === output, input, expectedOutput, output];
    }

    public test(sourceFilePath: string, testcases: Array<string>): [boolean, string, string, string] {
        sourceFilePath = resolve(sourceFilePath);

        const temporaryDirectory = dirSync();
        const temporaryDirectoryPath = temporaryDirectory.name;
        this.prepare(sourceFilePath, temporaryDirectoryPath);
        for (let i  = 0; i < testcases.length; i += 2) {
            const input = testcases[i], expectedOutput = testcases[i + 1];
            const result = this.run(sourceFilePath, temporaryDirectoryPath, input, expectedOutput);
            if (!result[0]) {
                return result;
            }
        }
        temporaryDirectory.removeCallback();
        return [true, '', '', ''];
    }
}