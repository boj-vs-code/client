import Axios from "axios";
import { parse, HTMLElement, TextNode } from "node-html-parser";
import * as fs from "fs";
import * as qs from "querystring";
import { LanguageInfo, getWorkspacePath } from "../lib"
import * as vscode from "vscode";

class Account {
    constructor(public id: string, public pw: string) {}
}

class TestCase {
    constructor(public input: string, public output: string) {}
}


export class Cookie {
    constructor(public name: string, public value: string) {}
    toString = (): string => `${this.name}=${this.value};`

    public static async getBOJSessionCookie(): Promise<Cookie> {
        return await Axios.get('https://www.acmicpc.net/').then(resp => {
            let cookies: Array<Cookie> = resp.headers['set-cookie']
                .map((x: string) => x.split(';')[0].split('='))
                .map((x: Array<string>) => new Cookie(x[0], x[1]));

            return cookies.filter(x => x.name === "OnlineJudge")[0];
        })
    }
}

interface IProblemMetadata {
    timeLimit?: string,
    memoryLimit?: string,
    submitCount?: string|Number,
    successCount?: string|Number,
    successPeopleCount?: string|Number,
    answerPercent?: string|Number,
}

class Problem {
    constructor (
        public title: string,
        public description: string,
        public inputDescription: string,
        public outputDescription: string,
        public testcases: Array<TestCase>,
        public metadata?: IProblemMetadata) {}
}

export default class BOJ {
    static session: BOJSession;
    static async getProblem(problemNumber: Number): Promise<Problem> {
        return await Axios.get(`https://acmicpc.net/problem/${problemNumber}`).then(resp => {
            const options = {
                lowerCaseTagName: false,  // convert tag name to lower case (hurt performance heavily)
                script: false,            // retrieve content in <script> (hurt performance slightly)
                style: false,             // retrieve content in <style> (hurt performance slightly)
                pre: true                // retrieve content in <pre> (hurt performance slightly)
              }
            
            const root: HTMLElement = <HTMLElement>parse(resp.data, options);
            const problemInfoElements = root.querySelector("#problem-info").childNodes[3].childNodes[1].childNodes;

            const testcases: Array<TestCase> = new Array<TestCase>();

            // get testcase
            for (let i = 1; i <= 10; ++i) {
                const inputElement = root.querySelector(`#sample-input-${i}`);
                const outputElement = root.querySelector(`#sample-output-${i}`);
                if (inputElement === null || outputElement === null) {
                    break;
                }

                const input = inputElement.text.trim().replace(/\r\n/g, '\n');
                const output = outputElement.text.trim().replace(/\r\n/g, '\n');

                testcases.push(new TestCase(input, output));
            }

            const title = root.querySelector("#problem_title").text.trim();
            const description = root.querySelector("#problem_description").text.trim();
            const inputDescription = root.querySelector("#problem_input").text.trim();
            const outputDescription = root.querySelector("#problem_output").text.trim();
            const [timeLimit, memoryLimit, submitCount, successCount, successPeopleCount, answerPercent] = problemInfoElements.map(x => x.rawText).filter(x => x.indexOf('\t') === -1);
            const metadata = {
                timeLimit: timeLimit,
                memoryLimit: memoryLimit,
                submitCount: submitCount,
                successCount: successCount,
                successPeopleCount: successPeopleCount,
                answerPercent: answerPercent,
            }

            return new Problem(title, description, inputDescription, outputDescription, testcases, metadata);
        });
    }
}

interface IBOJConfig {
    id: string,
    password: string,
}

class Config {
    public static getBOJConfigFromFile(): IBOJConfig {
        const rootPath = getWorkspacePath()
        const configFileContent = fs.readFileSync(`${rootPath}/.bojconfig`).toString();
        return JSON.parse(configFileContent);
    }
}

interface IJudgeSiteSession {
    sessionId: Cookie|undefined

    signin(): void;
    submit(problem: number, language: LanguageInfo, source: string): void;
}

class SessionInitilaizer {
    public static async initializeBOJSession(session: BOJSession) {
        Axios.get('https://www.acmicpc.net/').then(resp => {
            let cookies: Array<Cookie> = resp.headers['set-cookie']
                .map((x: string) => x.split(';')[0].split('='))
                .map((x: Array<string>) => new Cookie(x[0], x[1]));

            session.sessionId = cookies.filter(x => x.name === "OnlineJudge")[0];
        })
    }
}

export class BOJSession implements IJudgeSiteSession {
    public sessionId: Cookie = new Cookie("OnlineJudge", "unknown")
    public config: IBOJConfig = Config.getBOJConfigFromFile()

    constructor() {
        SessionInitilaizer.initializeBOJSession(this)
    }

    public signin(): Promise<any> {
        while(this.sessionId.value === "unknown") {    }
        
        const data = qs.stringify({
            login_user_id: this.config.id,
            login_password: this.config.password
        })

        const headers = {
            Cookie: this.sessionId.toString()
        }
        
        return Axios({
            method: 'post',
            url: 'https://www.acmicpc.net/signin',
            data: data,
            headers: headers
        });
    }

    public async submit(problem: number, language: LanguageInfo, source: string) {
        await this.signin();
        const getCsrfKey = async () => {
            return await Axios({
                method: 'get',
                url: `https://www.acmicpc.net/submit/${problem}`,
                headers: {
                    Cookie: this.sessionId.toString(),
                }
            }).then(resp => {
                const root: HTMLElement = <HTMLElement>parse(resp.data)
                const csrfKeyElement = <HTMLElement>root.querySelector('#submit_form').childNodes[5];
                return csrfKeyElement.rawAttributes.value;
            })
        }

        const csrf_key = await getCsrfKey();
        
        const data = qs.stringify({
            'source': source,
            'language': language.number,
            'problem_id': problem,
            'csrf_key': csrf_key,
            'code_open': 'open',
        })

        const headers = {
            Cookie: this.sessionId.toString(),
        }

        vscode.window.showInformationMessage(`Start to submit! / Problem Number: ${problem} / Language: ${language.language}`);

        Axios({
            method: 'post',
            url: `https://www.acmicpc.net/submit/${problem}`,
            data: data,
            headers: headers
        }).then(resp => {
            vscode.window.showInformationMessage("End of submit!");
        })
    }
}
