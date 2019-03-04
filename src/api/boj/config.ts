import { getWorkspacePath } from "../../lib";
import { IBOJConfig } from "./interfaces/boj-config";
import { readFileSync } from "fs";

export class Config {
  public static getBOJConfigFromFile(): IBOJConfig {
    const rootPath = getWorkspacePath();
    const configFileContent = readFileSync(`${rootPath}/.bojconfig`).toString();
    return JSON.parse(configFileContent);
  }
}
