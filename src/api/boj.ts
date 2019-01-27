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

class Problem {
    private description: string
    private inputDescription: string
    private outputDescription: string
    private testcases: Array<TestCase>

}

export class BOJSession {
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
