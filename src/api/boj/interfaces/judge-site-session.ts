import { Cookie } from "../cookie";
import { LanguageInfo } from "../../../lib";

export interface IJudgeSiteSession {
  sessionId: Cookie | undefined;

  signin(): void;
  submit(problem: number, language: LanguageInfo, source: string): void;
}
