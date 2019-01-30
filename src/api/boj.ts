import Axios from "axios";
import { Session } from "inspector";

class Account {
    constructor(private id: string, private pw: string) {}

    public getId(): string {
        return this.id
    }

    public getPassword(): string {
        return this.pw
    }
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

Axios.get('https://acmicpc.net/').then(resp => {
    let cookies: Array<Cookie> = resp.headers['set-cookie']
        .map((x: string) => x.split(';')[0].split('='))
        .map((x: Array<string>) => new Cookie(x[0], x[1]));

    console.log(cookies.filter(x => x.name === "OnlineJudge"));

    console.log(cookies);
    // console.log(resp.headers['set-cookie'][1].split(';')[0].split('='));
})

class Problem {
    constructor (
        private _description: string,
        private _inputDescription: string,
        private _outputDescription: string,
        private _testcases: Array<TestCase>) {}

        get getDescription() {
            return this._description;
        }

        get getInputDescription => _
}

class Parser {
    static getProblem
}

export class BOJ {
    static session: BOJSession;
    static initializeWithAccount() {

    }

    static initializeParser(session: BOJSession) {

    }

    static getProblem(problemNumber: Number): Problem {

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
