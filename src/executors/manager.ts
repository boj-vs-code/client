import { Executor } from ".";
import * as _executors from "../resources/executors.json";

interface IExecuteMethod {
    compile: string;
    execute: string;
}

const executors: {[languageName: string]: IExecuteMethod} = _executors;

export class ExecutorManager {
    /**
     * 
     * @param languageName name of language, based on resources/languages.json
     */
    static get(languageName:　string): Executor|undefined {
        const executeMethod: IExecuteMethod = executors[languageName];
        return new Executor(executeMethod.compile, executeMethod.execute);
    }
}