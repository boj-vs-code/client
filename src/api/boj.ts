import Axios from "axios";

class Account {
    private id: string
    private pw: string

    constructor(id: string, pw: string) {
        this.id = id
        this.pw = pw
    }

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

export class BOJ {
    static getProblem(problemNumber: Number): Problem {

    }
}

class BOJSession {
    private sessionId: string
    private account: Account
    
    constructor(id: string, pw: string) {
        this.account = new Account(id, pw)
    }

    public login() {

    }

    public isLoggedIn() {

    }

    public submit(problem: Number) {
        
    }
}
