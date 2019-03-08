import { ViewManager } from ".";
import { callbackify } from "util";

type Handler<T> = (changed: T) => void;

class ObservableArray<T> extends Array<T> {

    private handlers: Array<Handler<T>> = new Array<Handler<T>>();

    push(...items: T[]): number {
        const returnValue = super.push(...items);
        items.forEach(item => {
            this.handlers.forEach(fn => fn(item));
        });
        return returnValue;
    }

    registerHandler(fn: (changed: T) => void) {
        this.handlers.push(fn);
    }
}

const submitTasks = ObservableArray<>

export function showSubmitTasksView() {
  const panel = ViewManager.main;

  
  const tasks = "";

  panel.webview.html = `
    
  `;
}
