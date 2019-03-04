import { BOJSession } from "../api/boj";

const extensionSession = new Map<string, object>();
const bojSession = new BOJSession();

export { extensionSession, bojSession };
