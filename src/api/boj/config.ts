import { getWorkspacePath } from "../../lib";
import { IBOJConfig } from "./interfaces/boj-config";
import { readFileSync } from "fs";

export class Config {
  public static getBOJConfigFromFile(configFilename: string): IBOJConfig {
    const rootPath = getWorkspacePath();
    const configFileContent = readFileSync(
      `${rootPath}/${configFilename}`
    ).toString();
    return JSON.parse(configFileContent);
  }
}
