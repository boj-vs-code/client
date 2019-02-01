import Axios from "axios";
import { Session } from "inspector";
import { parse, HTMLElement, TextNode } from "node-html-parser";

class Account {
    constructor(public id: string, public pw: string) {}
}

class TestCase {
    public input: string
    public output: string

    constructor(input: string, output: string) {
        this.input = input
        this.output = output
    }

    public toString() {
        return `${this.input} || ${this.output}`;
    }
}


class Cookie {
    constructor(public name: string, public value: string) {}
}

class Problem {
    constructor (
        public title: string,
        public description: string,
        public inputDescription: string,
        public outputDescription: string,
        public testcases: Array<TestCase>,
        public metadata?: Map<string, string>) {}
}

export default class BOJ {
    static test() {
        Axios.get('https://acmicpc.net/problem/1080').then(resp => {
            let cookies: Array<Cookie> = resp.headers['set-cookie']
                .map((x: string) => x.split(';')[0].split('='))
                .map((x: Array<string>) => new Cookie(x[0], x[1]));

            console.log(cookies.filter(x => x.name === "OnlineJudge"));

            console.log(cookies);

            const options = {
                lowerCaseTagName: false,  // convert tag name to lower case (hurt performance heavily)
                script: false,            // retrieve content in <script> (hurt performance slightly)
                style: false,             // retrieve content in <style> (hurt performance slightly)
                pre: true                // retrieve content in <pre> (hurt performance slightly)
              }
            
            const root: HTMLElement = <HTMLElement>parse(resp.data, options);
            const problemInfoElements = root.querySelector("#problem-info").childNodes[3].childNodes[1].childNodes;
            const testcaseElements = root.querySelectorAll(".");

            const testcases: Array<TestCase> = new Array<TestCase>();

            // get testcase

            for (let i = 1; i <= 10; ++i) {
                const inputElement = root.querySelector(`#sample-input-${i}`);
                const outputElement = root.querySelector(`#sample-output-${i}`);
                if (inputElement === null || outputElement === null) {
                    break;
                }

                // console.log("Text", inputElement.rawText);

                "".replace

                const input = inputElement.text.trim().replace(/\r\n/g, '\n');
                const output = outputElement.text.trim().replace(/\r\n/g, '\n');

                testcases.push(new TestCase(input, output));
            }

            const title = root.querySelector("#problem_title").text.trim();
            const description = root.querySelector("#problem_description").text.trim();
            const inputDescription = root.querySelector("#problem_input").text.trim();
            const outputDescription = root.querySelector("#problem_output").text.trim();
            const [timeLimit, memoryLimit, submitCount, successCount, successPeopleCount, answerPercent] = problemInfoElements.map(x => x.rawText).filter(x => x.indexOf('\t') === -1);

            console.log("Title: ", title);
            console.log("Description: ", description);
            console.log("InputDescription: ", inputDescription);
            console.log("OutputDescription: ", outputDescription);
            console.log(testcases);
        });
    }

    static session: BOJSession;
    static initializeWithAccount() {

    }

    static initializeParser(session: BOJSession) {

    }

    static getProblem(problemNumber: Number): Problem {
        return new Problem("title", "description", "input", "output", []);
    }
}

export class BOJSession {
    private sessionId: string | undefined = undefined
    
    constructor(private account: Account) {}

    public signin() {
        // Axios.get()
    }

    public isSignedIn() {
        return undefined === this.sessionId
    }

    public submit(problem: Number) {
        
    }
}
