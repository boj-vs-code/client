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
}


class Cookie {
    constructor(public name: string, public value: string) {}
}

class Problem {
    constructor (
        private _description: string,
        private _inputDescription: string,
        private _outputDescription: string,
        private _testcases: Array<TestCase>) {}

        get getDescription() {
            return this._description;
        }
}

export default class BOJ {
    static test() {
        Axios.get('https://acmicpc.net/problem/1080').then(resp => {
            let cookies: Array<Cookie> = resp.headers['set-cookie']
                .map((x: string) => x.split(';')[0].split('='))
                .map((x: Array<string>) => new Cookie(x[0], x[1]));

            console.log(cookies.filter(x => x.name === "OnlineJudge"));

            console.log(cookies);
            
            const root: HTMLElement = <HTMLElement>parse(resp.data);
            console.log(root.querySelector("#problem_title").text);
            // console.log(resp.headers['set-cookie'][1].split(';')[0].split('='));
        });
    }

    static session: BOJSession;
    static initializeWithAccount() {

    }

    static initializeParser(session: BOJSession) {

    }

    static getProblem(problemNumber: Number): Problem {
        return new Problem("description", "input", "output", []);
    }
}

export class BOJSession {
    private sessionId: string | undefined = undefined
    
    constructor(private account: Account) {}

    public signin() {
        
    }

    public isSignedIn() {
        return undefined === this.sessionId
    }

    public submit(problem: Number) {
        
    }
}
