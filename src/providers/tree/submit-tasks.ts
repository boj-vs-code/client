import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

export class DepNodeProvider implements vscode.TreeDataProvider<SubmitTask> {
  private _onDidChangeTreeData: vscode.EventEmitter<
    SubmitTask | undefined
  > = new vscode.EventEmitter<SubmitTask | undefined>();
  readonly onDidChangeTreeData: vscode.Event<SubmitTask | undefined> = this
    ._onDidChangeTreeData.event;

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: SubmitTask): vscode.TreeItem {
    return element;
  }

  getChildren(element?: SubmitTask): Thenable<SubmitTask[]> {
    return Promise.resolve([
      new SubmitTask("label", "version", vscode.TreeItemCollapsibleState.None)
    ]);
  }
}

export class SubmitTask extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    private version: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly command?: vscode.Command
  ) {
    super(label, collapsibleState);
  }

  get tooltip(): string {
    return `${this.label}-${this.version}`;
  }

  get description(): string {
    return this.version;
  }

  iconPath = {
    light: path.join(
      __filename,
      "..",
      "..",
      "resources",
      "light",
      "dependency.svg"
    ),
    dark: path.join(
      __filename,
      "..",
      "..",
      "resources",
      "dark",
      "dependency.svg"
    )
  };

  contextValue = "dependency";
}
